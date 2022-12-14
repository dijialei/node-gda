const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String,
    name:String,
    rtt: Number,
    cp:Number,
    rttp: Number,
    role:String
});
const User = mongoose.model('User', userSchema);

module.exports = User;