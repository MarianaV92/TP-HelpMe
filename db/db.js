import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DBNAME;

const client = new MongoClient(uri);

let db = null;

export async function connectToDb() {
  if (db) return db;

  await client.connect();
  db = client.db(dbName);
  console.log(`Connecté à MongoDB sur la base ${dbName}`);
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Connexion à la DB non établie. Appelle connectToDb() d’abord.');
  }
  return db;
}
