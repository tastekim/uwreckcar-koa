import dotenv from 'dotenv';

dotenv.config();

const {
  LOCAL_USERNAME,
  LOCAL_PASSWORD,
  LOCAL_DBNAME,
  LOCAL_HOST,
  EC2_USERNAME,
  EC2_PASSWORD,
  EC2_DBNAME,
  EC2_HOST,
} = process.env;

const config: Record<string, any> = {
  development : {
    username : `root`,
    password : `tastekim`,
    database : `test_uwreckcar_db`,
    host : `localhost`,
    dialect : `mysql`,
  },
  test : {
    username : LOCAL_USERNAME,
    password : LOCAL_PASSWORD,
    database : LOCAL_DBNAME,
    host : LOCAL_HOST,
    dialect : 'mysql',
  },
  production : {
    username : EC2_USERNAME,
    password : EC2_PASSWORD,
    database : EC2_DBNAME,
    host : EC2_HOST,
    dialect : 'mysql',
  },
};

export default config;
