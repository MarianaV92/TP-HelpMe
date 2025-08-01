import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mockUsers from './mockUsers.js';
import { connectToDb} from '../db/db.js';  


(async () => {
    const db = await connectToDb(); 
  const collection = db.collection('users');

  try {
  
    await collection.createIndex({ username: 1 }, { unique: true });

    for (const rawUser of mockUsers) {
      const existing = await collection.findOne({ username: rawUser.username });

      if (!existing) {
        const hashedPassword = await bcrypt.hash(rawUser.password, 10);
        const user = {
          id: uuidv4(),
          username: rawUser.username,
          password: hashedPassword,
          name: rawUser.name,
          role: rawUser.role,
        };

        await collection.insertOne(user);
        console.log(` Utilisateur "${user.username}" inséré avec mot de passe hashé.`);
      } else {
        console.log(` Utilisateur "${rawUser.username}" existe déjà. Ignoré.`);
      }
    }
  } catch (err) {
    console.error(" Erreur lors de l'insertion :", err);
  } finally {
    await client.close();
  }
})();
