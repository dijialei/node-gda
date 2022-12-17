const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jourferieSchema = new Schema({

    date: String,

    type: String,

    jour: String,

    libelle: String,

});

const JourFerie = mongoose.model('JourFerie', jourferieSchema);



module.exports = JourFerie;