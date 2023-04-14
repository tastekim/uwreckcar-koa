import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from './users';
import { User_utm_sources } from './user-utm-sources';
import { User_utm_mediums } from './user-utm-mediums';

@Table({
  modelName : 'Utms',
  tableName : 'Utms',
  createdAt : 'created_at',
  updatedAt : 'updated_at',
  timestamps : true,
})
export class Utms extends Model {
  @Column({ primaryKey : true, autoIncrement : true })
  utm_id: number;

  @ForeignKey(() => Users)
  @Column
  user_id: number;

  @BelongsTo(() => User_utm_sources, {
    foreignKey : 'user_utm_source_id',
    onDelete : 'CASCADE',
    as : 'utm_source_name',
  })
  @Column
  user_utm_source_id: number;

  @BelongsTo(() => User_utm_mediums, {
    foreignKey : 'user_utm_medium_id',
    onDelete : 'CASCADE',
    as : 'utm_medium_name',
  })
  @Column
  user_utm_medium_id: number;

  @Column
  utm_url: string;

  @Column
  utm_campaign_id: string;

  @Column
  utm_campaign_name: string;

  @Column
  utm_content: string;

  @Column
  utm_term: string;

  @Column
  utm_memo: string;

  @Column
  full_url: string;

  @Column
  shorten_url: string;

  @Column
  short_id: string;
}