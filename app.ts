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

import Koa, { Context } from 'koa';
import { koaBody } from 'koa-body';
import passport from 'passport';
import helmet from 'koa-helmet';
import Sequelize from './models';
import { run as mongodb } from './src/configs/mongo.config';
import { kakaoStrategy } from './src/user-manage/kakaoStrategy';
// import cors from '@koa/cors';
import { utmRouter } from './src/utm-main/utm.routes';
import { kakaoRouter } from './src/user-manage/user.routes';

const app = new Koa();

// mongoDB initial
mongodb()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.error(err));

// MySQL initial
Sequelize
  .sync({ force: false })
  .then(() => {
    console.log('MySQL connected.');
  })
  .catch((err: Error) => {
    console.error(err);
  });

app.use(koaBody());
app.use(helmet());

passport.use(kakaoStrategy);

app.use(utmRouter.routes()).use(utmRouter.prefix('/api/utms').allowedMethods());
app.use(kakaoRouter.routes()).use(kakaoRouter.prefix('/api/auth/kakao').allowedMethods());

app.on('error', (err: any, ctx: Context) => {
  console.log('Error handler');
  console.log(err);
  ctx.status = err.statusCode | 500;
  ctx.response.body = {
    success : false,
    message : err.message,
  };
});

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));