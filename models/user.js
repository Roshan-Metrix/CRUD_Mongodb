const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)

const userSchema = new mongoose.Schema({
    image: String,
    email: String,
    name: String
});

module.exports = mongoose.model('User', userSchema); 
