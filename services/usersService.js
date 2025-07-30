
const {User}= require('../bo/User');
const mockUsers = require('./mockUsers');

const DB_USERS = mockUsers

let nextId = DB_USERS.length > 0 ? Math.max(...DB_USERS.map(u => u.id)) + 1 : 1;

// Ajouter un nouvel utilisateur
function addUser(userData) {
    const user =  new User({
    id: nextId++,
    username: userData.username,
    password: userData.password,
    name: userData.name,
    role: userData.role || 'user',
  });
    DB_USERS.push(user);
    return user;
}

// Trouver un utilisateur par email
function findUserByUsername(username) {
    return DB_USERS.find(u => u.username === username);
}

// Lister tous les utilisateurs
function getAllUsers() {
    return DB_USERS;
}

// ne pas oublier les exports
module.exports = {
  addUser,
  getAllUsers,
  findUserByUsername,
};