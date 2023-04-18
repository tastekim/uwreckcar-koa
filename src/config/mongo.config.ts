import { MongoClient } from 'mongodb';

const { MONGODB_URI, DB_NAME } = process.env;

// Replace the following with your Atlas connection string
const url = `${MONGODB_URI}`;
const client = new MongoClient(url);

export async function run () {
  try {
    await client.connect();
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.stack);
    }
  }
}

export const drawdb = client.db('withdraw');
const db = client.db(`${DB_NAME}`);

export default db;
