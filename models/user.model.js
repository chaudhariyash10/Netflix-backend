  
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    mobileNo: { type: String },
    firstName: {type: String},
    lastName: { type: String },
    password: {type: String, required: true},
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;