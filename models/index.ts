import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
import config from '../config/config';
import { Utms } from './utms';

const sequelize = new Sequelize({
  database : config[env].database,
  dialect : config[env].dialect,
  username : config[env].username,
  password : config[env].password,
  models : [Utms],
});

sequelize.addModels([Utms]);

const db = sequelize;

export default db;
