import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Users } from './users';
import { Utms } from './utms';

@Table({
  modelName : 'User_utm_sources',
  tableName : 'User_utm_sources',
  createdAt : 'created_at',
  updatedAt : 'updated_at',
  timestamps : true,
})
export class User_utm_sources extends Model {
  @HasMany(() => Utms, {
    foreignKey : 'user_utm_source_id',
    sourceKey : 'user_utm_source_id',
    as: 'userUtmSourceId',
  })
  @Column({ primaryKey : true, autoIncrement : true })
  user_utm_source_id: number;

  @ForeignKey(() => Users)
  @Column
  user_id: number;

  @Column
  source_name: string;
}