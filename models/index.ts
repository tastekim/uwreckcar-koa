import dotenv from 'dotenv';

import { Sequelize } from 'sequelize-typescript';
// import path from 'path';
// import {
//   SequelizeTypescriptMigration,
// } from 'sequelize-typescript-migration';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
import config from '../config/config';
import { Utms } from './utms';
import { Users } from './users';
import { User_utm_sources } from './user-utm-sources';
import { User_utm_mediums } from './user-utm-mediums';

const sequelize: Sequelize = new Sequelize({
  repositoryMode : true,
  database : config[env].database,
  dialect: 'mysql',
  // dialect : config.dialect as Dialect,
  username : config[env].username,
  password : config[env].password,
  models : [Utms, Users, User_utm_sources, User_utm_mediums],
  quoteIdentifiers : false,
  logging: false,
});

// (async () => {
//   await SequelizeTypescriptMigration.makeMigration(sequelize, {
//     outDir: path.join(__dirname, './migrations'),
//   });
// })();

export default sequelize;
