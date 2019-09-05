const mongoose = require('mongoose');
const schemaTable = new mongoose.Schema({
    idInstance: {
        type : String,
        required: true
    },
    path:{
        type : String,
        required: true

    }, 
    timestamp: {
        type: Date,
        required : true
    }





});


const schemaModel = mongoose.model('schemaModel',schemaTable);
module.exports = schemaModel;