import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Utms } from './utms';
import { User_utm_mediums } from './user-utm-mediums';
import { User_utm_sources } from './user-utm-sources';

@Table({
  modelName : 'Users',
  tableName : 'Users',
  createdAt : 'created_at',
  updatedAt : 'updated_at',
  timestamps : true,
})
export class Users extends Model {
  @HasMany(() => Utms, { foreignKey : 'user_id', sourceKey : 'user_id' })
  @HasMany(() => User_utm_mediums, {
    foreignKey : 'user_id',
    sourceKey : 'user_id',
  })
  @HasMany(() => User_utm_sources, {
    sourceKey : 'user_id',
    foreignKey : 'user_id',
  })
  @Column({ primaryKey : true, autoIncrement : true })
  user_id: number;

  @Column
  user_name: string;

  @Column
  email: string;

  @Column
  profile_img: string;

  @Column
  password: string;

  @Column
  salt: string;

  @Column
  company_name: string;

  @Column
  marketing_accept: boolean;

  @Column
  login_type: string;
}