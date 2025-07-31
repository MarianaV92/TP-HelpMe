import { User } from '../bo/User.js';
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
