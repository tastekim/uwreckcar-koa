import Router from '@koa/router';
import { Context } from 'koa';
import { authentication } from '../util/auth.module';
import {
  getUserProfileController, sendEmailController, signinForCompanyController,
  signupForCompanyController,
} from './user.controller';

const router = new Router<{}, Context>();

export const userRouter = router
  .use(['/'], authentication)
  .get('USER 정보 가져오기', '/', getUserProfileController)
  .post('USER 유렉카 회원가입 인증 메일', '/email', sendEmailController)
  .post('USER 유렉카 로그인', '/login', signinForCompanyController)
  .post('USER 유렉카 회원가입', '/signup', signupForCompanyController);