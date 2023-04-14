import {
  Table,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from './users';

@Table({
  modelName : 'User_utm_mediums',
  tableName : 'User_utm_mediums',
  createdAt : 'created_at',
  updatedAt : 'updated_at',
  timestamps : true,
})
export class User_utm_mediums extends Model {
  @Column({ primaryKey : true, autoIncrement : true })
  user_utm_medium_id: number;

  @ForeignKey(() => Users)
  @Column
  user_id: number;

  @Column
  medium_name: string;
}