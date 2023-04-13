import dotenv from 'dotenv';

dotenv.config();

const config:Record<string, any> = {
  development: {
    username: process.env.LOCAL_USERNAME,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DBNAME,
    host: process.env.LOCAL_HOST,
    dialect: process.env.LOCAL_DIALECT,
  },
  test: {
    username: process.env.LOCAL_USERNAME,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DBNAME,
    host: process.env.LOCAL_HOST,
    dialect: process.env.LOCAL_DIALECT,
  },
  production: {
    username: process.env.EC2_USERNAME,
    password: process.env.EC2_PASSWORD,
    database: process.env.EC2_DBNAME,
    host: process.env.EC2_HOST,
    dialect: process.env.EC2_DIALECT,
  },
};

export default config;
