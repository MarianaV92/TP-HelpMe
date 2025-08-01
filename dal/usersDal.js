import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../db/db.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';


export async function insertUser(data) {
 const db  =  getDb();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = {
    username: data.username,
    password: hashedPassword,
    name: data.name,
    role: data.role,
  };

  const result = await db.collection('users').insertOne(user);

  return {
    id: result.insertedId.toString(),  // retourne l'_id généré par MongoDB sous forme de string
    username: user.username,
    name: user.name,
    role: user.role,
  };
}

export async function deleteUser(id) {
 const db  =  getDb();
  const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

export async function findUserByUsername(username) {
  const db  =  getDb();
  let user = await db.collection("users").findOne({ username: username });
  return user;
}

export async function findAll() {
  const db  =  getDb();
  let user = await db.collection("users").find().toArray();
  return user;
}



