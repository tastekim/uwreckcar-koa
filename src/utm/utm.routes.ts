import Router from '@koa/router';
import { Context, Next } from 'koa';
import { findUserData } from '../user/user.module';
import { authentication } from '../util/auth.module';

const router = new Router<{}, Context>();

export const utmRouter = router
  .use(authentication)
  .post('UTM 전체 조회', '/', async (ctx: Context, next: Next) => {
    const { email } = ctx.state.user;
    const result = await findUserData(email);
    ctx.body = { result };
    await next();
  });