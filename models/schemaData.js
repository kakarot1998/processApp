const mongoose = require('mongoose');
const schemaDataCol = new mongoose.Schema({
    idInstance: {
        type : String,
        required: true
    },
    currentStep:{
        type : String,
        required: true

    }, 
    stepName:{
        type : String,
        required: true

    }, 
    choix:{
        type : String,
        required: true

    }, 
    collaborateur:{
        type : String,
        required: true

    }, 
    timestamp: {
        type: Date,
        required : true
    }





});


const schemaData = mongoose.model('schemaData',schemaDataCol);
module.exports = schemaData;