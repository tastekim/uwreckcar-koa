import { getAllUtms } from '../utm/utm.module';
import { deleteShortUrl } from '../util/mongo.module';
import { recordWithdrawReason } from '../util/mongo.module';
import { Context, Next } from 'koa';
import { userRepo } from '../config/mysql.config';
import jwtService from '../util/jwt.module';
import { nanoid } from 'nanoid';
import { CustomContext } from '../util/auth.module';
import {
  createHashedPassword,
  createCompanyUser,
  getHashedPassword,
  findCompanyUserData,
} from './user.module';
import { verifyAccountToEmail } from '../util/nodemailer.module';

export async function userWithdrawalController (ctx: Context, next: Next) {
  const { user_id } = ctx.state.user;
  const { reason } = ctx.request.body.data;
  const user_utm = await getAllUtms(user_id);

  const delete_shorten_utm_arr = user_utm.map(index => index.shorten_url);

  delete_shorten_utm_arr.map(shorten_url => deleteShortUrl(shorten_url));
  await recordWithdrawReason(reason);
  await userRepo.destroy({ where : { user_id } });
  ctx.status = 200;
  ctx.response.body = {
    success : true,
    data : 'Withdrawal completed.',
  };
  await next();
}

export async function getUserProfileController (ctx: Context, next: Next) {
  const {
    user_id,
    user_name,
    email,
    profile_img,
    company_name,
  } = ctx.state.user;
  ctx.status = 200;
  ctx.response.body = {
    user_id,
    user_name,
    email,
    profile_img,
    company_name,
  };
  await next();
}

// 회원가입 인증 코드 이메일 보내기
export async function sendEmailController (ctx: Context & CustomContext, next: Next) {
  const { email } = ctx.request.body.data;
  const dupCheck = await findCompanyUserData(email);
  if (dupCheck !== null) {
    ctx.thorw('Email already exists.', 401);
  }

  const verificationCode = nanoid(6);
  ctx.session.verifyCode = verificationCode;
  const sendEmailResult = await verifyAccountToEmail(email, verificationCode);

  ctx.status = 200;
  ctx.response.body = {
    success : true,
    data : 'Send mail successfully.',
  };
}

// uwreckcar 회원 로그인
export async function signinForCompanyController (ctx: Context, next: Next) {
  const { email, password } = ctx.request.body.data;
  const userData = await findCompanyUserData(email);

  if (userData !== null) {
    const inputPassword = await getHashedPassword(password, userData.salt) as { password: string, salt: string };
    if (userData.password === inputPassword.password) {
      const access_token = jwtService.createAccessToken(userData);
      const refresh_token = jwtService.createRefreshToken(userData);
      ctx.response.body = {
        success : true,
        data : {
          userData : {
            user_id : userData.user_id,
            username : userData.user_name,
            email : userData.email,
            profile_img : userData.profile_img,
            company_name : userData.company_name,
            marketing_accept : userData.marketing_accept,
          },
          access_token,
          refresh_token,
        },
      };
    } else {
      ctx.throw('Invalid password.', 401);
    }
  } else {
    ctx.throw(`Couldn't find user ${email}`, 401);
  }
  await next();
}

// uwreckcar 회원가입
export async function signupForCompanyController (ctx: Context, next: Next) {
  const {
    email,
    password,
    company_name,
    marketing_accept,
    user_name,
  } = ctx.requset.body.data;

  const hashPassword = await createHashedPassword(password) as { password: string, salt: string };
  const userData = await createCompanyUser(
    user_name,
    email,
    hashPassword.password,
    hashPassword.salt,
    company_name,
    marketing_accept
  );
  ctx.assert(userData, 400, `Already signed up for ${email}`);
  ctx.response.body = {
    success : true,
    data : {
      user_id : userData.user_id,
      user_name : userData.user_name,
      email : userData.email,
      profile_img : userData.profile_img,
      company_name : userData.company_name,
      marketing_accept : userData.marketing_accept,
    },
  };
  await next();
}