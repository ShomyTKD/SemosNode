const mongoose = require('mongoose');

// Definisanje šeme za korisnika
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	age: { type: Number }
});

// Kreiranje modela korisnika sa šemom
const User = mongoose.model('User', userSchema);

module.exports = User;