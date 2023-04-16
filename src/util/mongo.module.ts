import db from '../config/mongo.config';

const { COLLECTION_NAME } = process.env;

export async function getShortUrlClickCount(short_id: string) {
  const userInfo = await db
    .collection(`${COLLECTION_NAME}`)
    .findOne({ shortId : short_id });
  return userInfo.clickCount;
}