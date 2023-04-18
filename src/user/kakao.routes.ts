import Router from '@koa/router';
import { kakaoCallback, kakaoCtr, kakaoLogin } from './kakao/kakaoStrategy';

const router = new Router();

export const kakaoRouter = router
  .get('kakao login 요청', '/', kakaoLogin)
  .use(kakaoCallback)
  .get('kakao 에 토큰 요청', '/callback', kakaoCtr);