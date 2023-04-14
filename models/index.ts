import dotenv from 'dotenv';

import { Sequelize } from 'sequelize-typescript';
import { join } from 'path';
import {
  SequelizeTypescriptMigration,
} from 'sequelize-typescript-migration-lts';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
import config from '../config/config';
import { Utms } from './utms';
import { Users } from './users';
import { User_utm_sources } from './user-utm-sources';
import { User_utm_mediums } from './user-utm-mediums';
import { Dialect } from 'sequelize';

console.log(config[env]);

const sequelize = new Sequelize({
  repositoryMode : true,
  database : config[env].database,
  dialect : config[env].dialect as Dialect,
  username : config[env].username,
  password : config[env].password,
  models : [Utms, Users, User_utm_sources, User_utm_mediums],
  quoteIdentifiers: false,
});

(async () => {
  await SequelizeTypescriptMigration.makeMigration(sequelize, {
    outDir : join(__dirname, './migrations'),
    migrationName : 'init',
    preview : false,
  });
})();

const db = sequelize;

export default db;
