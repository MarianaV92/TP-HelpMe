import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../db/db.js';
import { ObjectId } from 'mongodb';

export async function insertTicket(data) {
const db  =  getDb();
  const ticket = {
    id: uuidv4(),
    auteur: data.auteur,
    titre: data.titre,
    description: data.description,
    creation: new Date(),
    etat: 'OUVERT', 
  };
  await db.collection('tickets').insertOne(ticket);
  return ticket;
}


export async function deleteTicket(id) {
  const db  =  getDb();
  const result = await db.collection("tickets").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;  
}

export async function findTicketByObjectId(id) {
   const db  =  getDb();
  let ticket = await db.collection("tickets").findOne({ _id: new ObjectId(id) });
  return ticket;
}

export async function findAll() {
  const db  =  getDb();
  let tickets = await db.collection("tickets").find().toArray();
  return tickets;
}



