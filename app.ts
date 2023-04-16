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
import Sequelize from './models';
import { run as mongodb } from './src/config/mongo.config';
import { kakaoStrategy } from './src/user/kakao/kakaoStrategy';
// import cors from '@koa/cors';
import { utmRouter } from './src/utm/utm.routes';
import { kakaoRouter } from './src/user/kakao.routes';

const { SERVER_PORT } = process.env;

const app = new Koa();

// mongoDB initial
(async () => {
  await mongodb();
  console.log('MongoDB connected');
})();

// MySQL initial
(async () => {
  await Sequelize.sync({ force : false });
  console.log('MySQL connected');
})();

app.use(koaBody());
app.use(helmet());

passport.use(kakaoStrategy);

app.use(utmRouter.routes()).use(utmRouter.prefix('/api/utms').allowedMethods());
app.use(kakaoRouter.routes()).use(kakaoRouter.prefix('/api/auth/kakao').allowedMethods());

app.on('error', (err: Error, ctx: Context) => {
  console.log('Error handler');
  console.log(err);
  ctx.status = 500;
  ctx.response.body = {
    success : false,
    message : err.message,
  };
});

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));