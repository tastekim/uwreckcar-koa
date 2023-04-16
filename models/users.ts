import { Table, Column, Model, HasMany, Default } from 'sequelize-typescript';
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
  @HasMany(() => Utms, {
    foreignKey : 'user_id',
    sourceKey : 'user_id',
    onDelete : 'CASCADE',
    as : 'utms',
  })
  @HasMany(() => User_utm_mediums, {
    foreignKey : 'user_id',
    sourceKey : 'user_id',
    as : 'userUtmMediums',
  })
  @HasMany(() => User_utm_sources, {
    sourceKey : 'user_id',
    foreignKey : 'user_id',
    as : 'userUtmSources',
  })
  @Column({ primaryKey : true, autoIncrement : true })
  user_id: number;

  @Column
  user_name: string;

  @Column
  email: string;

  @Default('https://velog.velcdn.com/images/tastekim_/post/60f96a34-2142-43fe-b109-9312af658a3d/image.png')
  @Column
  profile_img: string;

  @Default('-')
  @Column
  password: string;

  @Default('-')
  @Column
  salt: string;

  @Default('-')
  @Column
  company_name: string;

  @Default(false)
  @Column
  marketing_accept: boolean;

  @Column
  login_type: string;
}