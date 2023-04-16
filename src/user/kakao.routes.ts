import Router from '@koa/router';
import { kakaoCallback, kakaoLogin } from './kakao/kakaoStrategy';
import { Context, Next } from 'koa';
import { alreadyExists } from './user.module';
import Slack from '../config/slack.config';

const router = new Router();

export const kakaoRouter = router
  .get('kakao login 요청', '/', kakaoLogin)
  .use(kakaoCallback)
  .get('kakao 에 토큰 요청', '/callback',
    async (ctx: Context, next: Next) => {
      try {
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
      } catch (err) {
        console.error(err);
        await Slack('KakaoLogin', err);
        ctx.status = 500;
        ctx.response.body = { errorMessage : err.message, stack : err.stack };
      }
    });