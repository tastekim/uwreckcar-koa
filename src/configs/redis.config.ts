import Redis from 'ioredis';

const { REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOST } = process.env;

const redisClient = new Redis(17946, REDIS_HOST, {
  username : REDIS_USERNAME,
  password : REDIS_PASSWORD,
});

export default redisClient;