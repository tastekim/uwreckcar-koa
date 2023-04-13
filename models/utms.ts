import { Table, Column, Model } from 'sequelize-typescript';

@Table({ modelName : 'Utms' })
export class Utms extends Model {
  @Column({ primaryKey : true })
  utm_id: string;

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