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
// import cors from '@koa/cors';

const app = new Koa();

app.use(koaBody());

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