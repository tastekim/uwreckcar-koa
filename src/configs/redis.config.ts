import Redis from 'ioredis';

const redisClient = new Redis(17946, process.env.REDIS_HOST, {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

export default redisClient;