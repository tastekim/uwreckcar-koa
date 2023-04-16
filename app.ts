import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV);
  dotenv.config({ path : path.join(__dirname, '/.env') });
} else if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  dotenv.config({ path : path.join(__dirname, '/.env.local') });
} else {
  console.error('Not defined process.env.NODE_ENV');
  throw new Error('Not defined process.env.NODE_ENV');
}

import Koa, { Context, Next } from 'koa';
import { koaBody } from 'koa-body';
import passport from 'passport';
import helmet from 'koa-helmet';
import session from 'koa-session';
import { run as mongodb } from './src/config/mongo.config';
import { kakaoStrategy } from './src/user/kakao/kakaoStrategy';
import cors from '@koa/cors';
import { utmRouter } from './src/utm/utm.routes';
import { kakaoRouter } from './src/user/kakao.routes';

const { SERVER_PORT, SESSION_SECRET_KEY } = process.env;

const app = new Koa();

const allowedOrigins = [`${process.env.CLIENT_URL}`, `${process.env.CLIENT_LOCAL}`];
app.use(
  cors({
      origin : (ctx: Context) => {
        const requestOrigin = ctx.headers.origin;
        if (allowedOrigins.includes(requestOrigin)) {
          return requestOrigin;
        }
        // 허용되지 않은 origin의 경우 null을 반환하여 CORS를 차단합니다.
        return null;
      },
      credentials : true,
    }
  ));

app.keys = [SESSION_SECRET_KEY];
app.use(session(app));

// mongoDB initial
(async () => {
  await mongodb();
  console.log('MongoDB connected');
})();

app.use(koaBody());
app.use(helmet());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('Error handler');
    ctx.status = err.status || 500;
    ctx.response.body = {
      success : false,
      message : err.message,
    };
    ctx.app.emit('error', err, ctx);
  }
});

passport.use(kakaoStrategy);

app.use(utmRouter.routes()).use(utmRouter.prefix('/api/utms').allowedMethods());
app.use(kakaoRouter.routes()).use(kakaoRouter.prefix('/api/auth/kakao').allowedMethods());

app.on('error', (err: Error, ctx: Context) => {
  console.error('Error Listener : ', err);
});

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));