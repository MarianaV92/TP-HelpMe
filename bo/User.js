export class User {
  constructor({ id, username, password, name, role }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.role = role;
  }

  // Méthode pour retourner l'utilisateur sans mot de passe
  toPublic() {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      role: this.role,
    };
  }

  isAdmin() {
    return this.role === 'admin';
  }
}