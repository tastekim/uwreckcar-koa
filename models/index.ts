import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
import config from '../config/config';
import { Utms } from './utms';
import { Users } from './users';
import { User_utm_sources } from './user-utm-sources';
import { User_utm_mediums } from './user-utm-mediums';

const sequelize = new Sequelize({
  repositoryMode : true,
  database : config[env].database,
  dialect : config[env].dialect,
  username : config[env].username,
  password : config[env].password,
  models : [Utms],
});

sequelize.addModels([Utms, Users, User_utm_sources, User_utm_mediums]);

const db = sequelize;

export default db;
