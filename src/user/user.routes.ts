import Router from '@koa/router';
import { Context } from 'koa';
import { authentication } from '../util/auth.module';
import {
  getUserProfileController, sendEmailController, signinForCompanyController,
  signupForCompanyController, userWithdrawalController, validateEmailController,
} from './user.controller';

const router = new Router<{}, Context>();

export const userRouter = router
  .use(['/', '/withdrawal'], authentication)
  .get('USER 정보 가져오기', '/', getUserProfileController)
  .post('USER 유렉카 회원 탈퇴', '/withdrawal', userWithdrawalController)
  .post('USER 유렉카 회원가입 인증 메일', '/email', sendEmailController)
  .post('USER 이메일 인증번호 확인', '/verify-code', validateEmailController)
  .post('USER 유렉카 로그인', '/login', signinForCompanyController)
  .post('USER 유렉카 회원가입', '/signup', signupForCompanyController);