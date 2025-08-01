import { v4 as uuidv4 } from 'uuid';

const mockUsers = [
  { id: uuidv4(), username: 'alice123', password: 'password1', name: 'Alice Dupont', role: 'admin' },
  { id: uuidv4(), username: 'bob456', password: 'password2', name: 'Bob Martin', role: 'user' },
  { id: uuidv4(), username: 'joe789', password: 'password3', name: 'Joe Durant', role: 'user' },
];

export default mockUsers;

