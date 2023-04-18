import db from '../config/mongo.config';
import { drawdb } from '../config/mongo.config';

const { COLLECTION_NAME } = process.env;

export async function getShortUrlClickCount (short_id: string) {
  const userInfo = await db
    .collection(`${COLLECTION_NAME}`)
    .findOne({ shortId : short_id });
  return userInfo.clickCount;
}

export async function deleteShortUrl (shorten_url: string) {
  const short_id = shorten_url.slice(27);
  const result = await db.collection(COLLECTION_NAME).deleteOne({ shortId : short_id });
  return result.acknowledged;
}

export async function recordWithdrawReason (reason: string) {
  const result = await drawdb.collection('reason').insertOne({
    reason,
  });
  return result.acknowledged;
}