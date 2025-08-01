
import { insertUser, findAll, findUserByUsername, deleteUser } from '../dal/usersDal.js';

export async function createUserService(data) {
  const inserted = await insertUser(data);
  return inserted;
}

export async function findUserByUsernameService(username) {
  const user  = await findUserByUsername(username);
  return user;
}


export async function deleteUserById(id){
return await deleteUser(id);
}

// Lister tous les utilisateurs
export async function getAllUsers() {
  const users = await findAll();
    return users;
}



/*import { User } from '../bo/User.js';
import mockUsers from './mockUsers.js';

const DB_USERS = mockUsers;

let nextId = DB_USERS.length > 0 ? Math.max(...DB_USERS.map(u => u.id)) + 1 : 1;







// Ajouter un nouvel utilisateur
export function addUser(userData) {
  const user = new User({
    id: nextId++,
    username: userData.username,
    password: userData.password,
    name: userData.name,
    role: userData.role || 'user',
  });
  DB_USERS.push(user);
  return user;
}

// Trouver un utilisateur par username
export function findUserByUsername(username) {
  return DB_USERS.find(u => u.username === username);
}

// Lister tous les utilisateurs
export function getAllUsers() {
  return DB_USERS;
}
*/