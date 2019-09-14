var uuid = require('uuid');
var fs = require('fs');
var path = require('path');
var file = require('./JSONFiles/processSchema.json');
var jsdom = require('jsdom');
var $ = require('jquery')(new jsdom.JSDOM().window);
const definition = require('./JSONFiles/processDefinition.json');




function fileParser() {
    var schema = JSON.stringify(file);
    fs.readFile('./JSONFiles/processData.json', 'utf8', function readFileCallback(err, file) {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile('./JSONFiles/processData.json', schema, function readFileCallback(err, file) {
                if (err) return err;
            });
        }
    });
};
function makeInstance(schemaID) {
    var dataFile = require('./JSONFiles/processData.json');
    dataFile.schemaID = schemaID;
    var inst = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    dataFile.Processus.idInstance = inst;
    console.log("votre ID d'instance est : " + dataFile.Processus.idInstance);
    fs.writeFileSync('./JSONFiles/processData.json', JSON.stringify(dataFile));
    return inst;
};
function getNextStep(schemaID, currentStep) {

     let ongoingStep, nextStep;
     var dataFile = require('./JSONFiles/processData.json');
     const definition = require('./JSONFiles/processDefinition.json');
     if (schemaID !== dataFile.schemaID) {
         console.log("Erreur : fichier schema incompatible");
     }
     else {
         if (currentStep !== dataFile.Processus.currentStep) {
             console.log("Erreur : Etape inconnue");
         } else {
             for (i = 0; i < definition.Processus.Steps.length; i++) {
                 var stepNames = JSON.stringify(definition.Processus.Steps[i].step.name);
                 var n = stepNames.includes(currentStep);
                 if (n == false) {
                     console.log("L'etape avec l'indice suivant n'est pas l'etape actuelle: " + i);
                 } else if (currentStep === "documentApprouve") {
                     console.log("L'etape actuelle est : " + currentStep);
                 console.log("Ceci est la derniere etape");

                 }
                 else {
                     ongoingStep = definition.Processus.Steps[i].step.name;
                     nextStep = definition.Processus.Steps[++i].step.name;
                 }
             }
     }
     }

}
function isEmpty(schemaID) {
    var counter;
    var dataFile = require('./JSONFiles/processData.json');
    if (schemaID !== dataFile.schemaID) {
        console.log("fichier schema incompatible");
    } else {
        for (var i = 0; i < dataFile.Processus.Steps.length; i++) {
            counter = 0;
            if ((dataFile.Processus.Steps[i].step.name).length === 0) {
                console.log("L'etape " + i + " est vide"); counter++;
                return counter;
            }else{
                console.log("L'etape "+i+" a ete executee au moins une fois");
            }
        }
    }
}
function random(){
    var test = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log(test);
}
function processGO(userID,fileID){
    $(document).ready(function(){
        $.getJSON("processData.json",function(data){
                $(data).each(function(index,value){
                    if (fileID !== data.schemaID){
                        alert("fichier schema incompatible");
                    }else {
                        $("#schema").append("L'id du schema est : "+ fileID);
                        value.Processus.currentStep = "brouillonPret";
                        value.Processus.Steps[0].step.collaborateurs = userID;
                        fs.writeFileSync('./JSONFiles/processData.json', JSON.stringify(value));
                    }


                })
        })

        


    })
}
module.exports = { processGO, fileParser, makeInstance, getNextStep }
//fileParser();
//getNextStep(1,"documentApprouve");
//isEmpty(1);