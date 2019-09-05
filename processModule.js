var uuid = require('uuid');
var fs = require('fs');
var path = require('path');
var file = require('./JSONFiles/processSchema.json');
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
    dataFile.Processus.idInstance = uuid.v4();
    console.log("votre ID d'instance est : " + dataFile.Processus.idInstance);
    fs.writeFileSync('./JSONFiles/processData.json', JSON.stringify(dataFile));
};
function getNextStep(schemaID, currentStep) {
    $(document).ready(function(){
        $.ajax({
            url: "processData.json",
            dataType: "json",
            success: function(data){
                $(data).each(function(index,value){
                        if(data.schemaID!==schemaID){
                            alert("fichier schema incorrect");
                        }else if(data.schemaID==schemaID && currentStep === "brouillonPret" ){
                            $("#currentStep").append(currentStep);
                            $("#nextStep").append("Les etapes suivantes sont : "+ value.Processus.Steps[index+1].step.name + "," +value.Processus.Steps[index+2].step.name + "," + value.Processus.Steps[index+3].step.name + "," + value.Processus.Steps[index+4].step.name);

                        } else {
                            if(currentStep!==data.currentStep){
                                alert("etape inconnue");
                            }else {
                                $.ajax({
                                    url: "processDefinition.json",
                                    dataType: "json",
                                    success : function(data){
                                        $(data).each(function(index,value){
                                                var stepNames = JSON.stringify(data.Processus.Steps[index].step.name);
                                                var n = stepNames.includes(currentStep);
                                                if(n==false){
                                                    alert("L'etape avec l'indice suivant " + index + "n'est pas l'etape actuelle");

                                                }else if(currentStep==="documentApprouve"){
                                                    $("#currentStep").append(currentStep);
                                                    $("#nextStep").append("Ceci est L'etape finale");

                                                }else {
                                                    ongoingStep = value.Processus.Steps[index].step.name;
                                                    nextStep = value.Processus.Steps[++index].step.name;
                                                    $("#currentStep").append("L'etape actuelle est : " + ongoingStep);
                                                    $("#nextStep").append("L'etape suivante est : " + nextStep);
                                                }



                                        })

                                    }
                                    
                                })

                            }

                        }


                })

            }


        })


    })
    // let ongoingStep, nextStep;
    // var dataFile = require('./JSONFiles/processData.json');
    // const definition = require('./JSONFiles/processDefinition.json');
    // if (schemaID !== dataFile.schemaID) {
    //     console.log("Erreur : fichier schema incompatible");
    // }
    // else if (schemaID === dataFile.schemaID && currentStep === "brouillonPret") {
    //     $("#currentStep").append(currentStep);
    //     $("#nextStep").append("Les etapes suivantes sont : " + definition.Processus.Steps[0].step.name + "," + definition.Processus.Steps[1].step.name + "," + definition.Processus.Steps[2].step.name + "," + definition.Processus.Steps[3].step.name);

    // }
    // else {
    //     if (currentStep !== dataFile.Processus.currentStep) {
    //         console.log("Erreur : Etape inconnue");
    //     } else {
    //         for (i = 0; i < definition.Processus.Steps.length; i++) {
    //             var stepNames = JSON.stringify(definition.Processus.Steps[i].step.name);
    //             var n = stepNames.includes(currentStep);
    //             if (n == false) {
    //                 console.log("L'etape avec l'indice suivant n'est pas l'etape actuelle: " + i);
    //             } else if (currentStep === "documentApprouve") {
    //                 console.log("L'etape actuelle est : " + currentStep);
    //                 console.log("Ceci est la derniere etape");

    //             }
    //             else {
    //                 ongoingStep = definition.Processus.Steps[i].step.name;
    //                 nextStep = definition.Processus.Steps[++i].step.name;
    //                 console.log("L'etape actuelle est : " + ongoingStep);
    //                 console.log("L'etape suivante est : " + nextStep);
    //             }
    //         }
    //     }
    // }

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


module.exports = { fileParser, makeInstance, getNextStep }
//fileParser();
//getNextStep(1,"documentApprouve");
//isEmpty(1);