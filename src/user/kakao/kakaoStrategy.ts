import { Strategy as KakaoStrategy } from 'passport-kakao';
import { Context, Next } from 'koa';
import passport from 'passport';
import { alreadyExists } from '../user.module';

const {
  REST_API_KEY,
  CLIENT_SECRET_KEY,
  REDIRECT_URI,
  CLIENT_URL,
} = process.env;

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID : REST_API_KEY,
    clientSecret : CLIENT_SECRET_KEY,
    callbackURL : REDIRECT_URI,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = profile._json;
      return done(null, {
        access_token : accessToken,
        refresh_token : refreshToken,
        user,
      });
    } catch (error) {
      return done(error);
    }
  }
);

export const kakaoLogin = passport.authenticate('kakao', {
  scope : ['profile_nickname', 'profile_image', 'account_email'],
});
export const kakaoCallback = passport.authenticate('kakao', {
  failureRedirect : `${CLIENT_URL}`,
  session : false,
});

export async function kakaoCtr(ctx: Context, next: Next) {
  const { access_token, refresh_token, user } = ctx.user;
  console.log('AccessToken : ', access_token);
  console.log('RefreshToken : ', refresh_token);

  // 기존 회원 확인 후 새로 가입.
  const existCheck = await alreadyExists(user.kakao_account.email);
  if (!existCheck) {
    ctx.status = 400;
    ctx.response.body = {
      success : false,
      message : 'Kakao signup blocked.',
    };
  } else {
    ctx.status = 200;
    ctx.response.body = {
      access_token,
      refresh_token,
    };
  }
  await next();
}