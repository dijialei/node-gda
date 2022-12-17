const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const absencesSchema = new Schema({
    userId: String,
    userName: String,
    debut:String,
    fin: String,
    status:String,
    type: String,
    motif:String,
    days: Number
});
const Absence = mongoose.model('Absence', absencesSchema);

module.exports = Absence;