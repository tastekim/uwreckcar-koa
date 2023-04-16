import { Context, Next } from 'koa';
import { getAllUtms } from './utm.module';
import { getShortUrlClickCount } from '../util/mongo.module';
import { Utms } from '../../models/utms';

export async function getAllUtmsController(ctx: Context, next: Next) {
  const { user_id } = ctx.user;
  const dateFixResult = await getAllUtms(user_id);
  const result = await Promise.all(
    dateFixResult.map(async (doc: Utms) => {
      const click_count = await getShortUrlClickCount(doc.short_id);
      return {
        utm_id : doc.utm_id,
        utm_url : doc.utm_url,
        utm_campaign_id : doc.utm_campaign_id,
        utm_campaign_name : doc.utm_campaign_name,
        utm_content : doc.utm_content,
        utm_term : doc.utm_term,
        utm_memo : doc.utm_memo,
        full_url : doc.full_url,
        shorten_url : doc.shorten_url,
        click_count,
        utm_medium_name : doc.user_utm_medium_id,
        utm_source_name : doc.user_utm_source_id,
        created_at_filter : new Date(doc.createdAt).toISOString().slice(0, 10),
      };
    })
  );
  ctx.status = 200;
  ctx.response.body = {
    success : true,
    data : result,
  };
}