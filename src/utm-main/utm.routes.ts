import Router from '@koa/router';
import { Context, Next } from 'koa';
import { findUserData } from '../user-manage/user.module';

const router = new Router();

export const utmRouter = router
  .get('UTM 전체 조회', '/', async (ctx: Context, next: Next) => {
    console.log('hi');
    const result = await findUserData('tttt');
    ctx.body = result;
  });