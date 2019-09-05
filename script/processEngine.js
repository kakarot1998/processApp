var express = require('express');
var uuid = require('uuid');
var fs = require('fs');
var path = require('path');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var request = new XMLHttpRequest()
const schemaModel = require('../models/schemaModel');
const schemaData = require('../models/schemaData');
var file = require('../JSONFiles/processSchema.json');
var def = require('../JSONFiles/processDefinition.json');
var eventDate = new Date();
var assert = require('assert');
const processModule = require("../processModule.js");
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var window = new JSDOM();
global.document = new JSDOM("http://localhost:3000/").window.document;
var $ = require('jquery')(new jsdom.JSDOM().window);
var dataFile = require('../JSONFiles/processData.json');
var definition = require('../JSONFiles/processDefinition.json');


function hello() {
    alert("GGGGGGGGGG");
};
function getHistory() {
    $(document).ready(function () {
        $.ajax({
            url: "processData.json",
            dataType: "json",
            success: function (data) {
                $(data).each(function (index, value) {
                    var record = "<tr><td>" + (index) + "</td><td>" + value.Processus.Steps[index].step.name + "</td><td>" + value.Processus.Steps[index].step.nextStep + "</td><td>" + value.Processus.Steps[index].step.collaborateurs + "</td><td>" + value.Processus.Steps[index].step.state + "</td><td>" + value.Processus.Steps[index].step.condition + "</td><td>" + value.Processus.Steps[index].step.result + "</td></tr>" +
                        "<tr><td>" + (index + 1) + "</td><td>" + value.Processus.Steps[index + 1].step.name + "</td><td>" + value.Processus.Steps[index + 1].step.nextStep + "</td><td>" + value.Processus.Steps[index + 1].step.collaborateurs + "</td><td>" + value.Processus.Steps[index + 1].step.state + "</td><td>" + value.Processus.Steps[index + 1].step.condition + "</td><td>" + value.Processus.Steps[index + 1].step.result + "</td></tr>" +
                        "<tr><td>" + (index + 2) + "</td><td>" + value.Processus.Steps[index + 2].step.name + "</td><td>" + value.Processus.Steps[index + 2].step.nextStep + "</td><td>" + value.Processus.Steps[index + 2].step.collaborateurs + "</td><td>" + value.Processus.Steps[index + 2].step.state + "</td><td>" + value.Processus.Steps[index + 2].step.condition + "</td><td>" + value.Processus.Steps[index + 2].step.result + "</td></tr>" +
                        "<tr><td>" + (index + 3) + "</td><td>" + value.Processus.Steps[index + 3].step.name + "</td><td>" + value.Processus.Steps[index + 3].step.nextStep + "</td><td>" + value.Processus.Steps[index + 3].step.collaborateurs + "</td><td>" + value.Processus.Steps[index + 3].step.state + "</td><td>" + value.Processus.Steps[index + 3].step.condition + "</td><td>" + value.Processus.Steps[index + 3].step.result + "</td></tr>" +
                        "<tr><td>" + (index + 4) + "</td><td>" + value.Processus.Steps[index + 4].step.name + "</td><td>" + value.Processus.Steps[index + 4].step.nextStep + "</td><td>" + value.Processus.Steps[index + 4].step.collaborateurs + "</td><td>" + value.Processus.Steps[index + 4].step.state + "</td><td>" + value.Processus.Steps[index + 4].step.condition + "</td><td>" + value.Processus.Steps[index + 4].step.result + "</td></tr>";
                    $("#processTable").append(record);
                });
            }
        });
    });
}
function getTasks(userID, schemaID) {
    $(document).ready(function () {
        $.ajax({
            url: "processData.json",
            dataType: "json",
            success: function (data) {
                $(data).each(function (index, value) {
                    if (data.schemaID !== schemaID) {
                        alert("fichier schema incorrect");
                    } else {
                        for (var index = 0; index < value.Processus.Steps.length; index++) {
                            if (value.Processus.Steps[index].step.collaborateurs === userID) {
                                var record = "<tr><td>" + (index) + "</td><td>" + value.Processus.Steps[index].step.name + "</td><td>" + value.Processus.Steps[index].step.nextStep + "</td><td>" + value.Processus.Steps[index].step.collaborateurs + "</td><td>" + value.Processus.Steps[index].step.state + "</td><td>" + value.Processus.Steps[index].step.condition + "</td><td>" + value.Processus.Steps[index].step.result + "</td></tr>";
                                $("#processTable").append(record);
                            } else {
                                console.log("tache liee hsdv");

                            }
                        }
                    }
                });
            }

        });



    });



}
function getActions(schemaID) {
    $(document).ready(function () {
        $.ajax({
            url: "processData.json",
            dataType: "json",
            success: function (data) {
                $(data).each(function (index, value) {
                    if (schemaID !== data.schemaID) {
                        alert("fichier schema incorrect");
                    } else {
                        for (var index = 0; index < value.Processus.Steps.length; index++) {
                            var record = "L'etape avec l'indice " + index + " est : " + value.Processus.Steps[index].step.name + "</br>";
                            $("#processTable").append(record);

                        }



                    }
                })
            }
        })







    })
    // if (dataFile.schemaID !== schemaID) {
    //     console.log("instance inconnue");
    // } else {
    //     for (var i = 0; i < dataFile.Processus.Steps.length; i++) {
    //         console.log(dataFile.Processus.Steps[i].step.name);
    //     }
    // }
}
function startProcess(userID, fileID, choice) {
    // $(document).ready(function () {
    //     $.ajax({
    //         url: "processData.json",
    //         dataType: "json",
    //         success: function (data) {
    //             $(data).each(function (index, value) {
    //                 if (data.schemaID !== fileID) {
    //                     alert("fichier incorrect");
    //                 } else {
    //                     $("#schemaInf").append("L id du schema est : " + fileID);
    //                     $("#userInf").append("Processus demarre par : " + userID);
    //                     value.Processus.currentStep = choice;
    //                     value.Processus.Steps[0].step.collaborateurs = userID;
    //                     value.Processus.Steps[0].step.nextStep = choice;
    //                     console.log(data);
    //                 }


    //             })


    //         }




    //     })



    // })


    processModule.makeInstance(fileID);
     if (fileID !== dataFile.schemaID) {
         console.log("erreur");

     } else {
         console.log("L'id du schema est : " + fileID);
         let col = def.Processus.Steps[0].step.collaborateurs;
         dataFile.Processus.currentStep = choice;
         dataFile.Processus.Steps[0].step.collaborateurs = col;
         dataFile.Processus.Steps[0].step.nextStep = choice;
         fs.writeFileSync('./JSONFiles/processData.json', JSON.stringify(dataFile));
     }
}


function dbConnect() {
    mongoose.connect(coll, { useNewUrlParser: true })
        .then(() => console.log('Connection reussie'))
        .catch(err => console.log('erreur'))
}
function nextStep(schemaID, currentStep) {
    $(document).ready(function () {
        $.ajax({
            url: "processData.json",
            dataType: "json",
            success: function (data) {
                $(data).each(function (index, value) {
                    if (data.schemaID !== schemaID) {
                        alert("fichier schema incorrect");
                    } else if (data.schemaID == schemaID && currentStep === "brouillonPret") {
                        $("#currentStep").append(currentStep);
                        $("#nextStep").append("Les etapes suivantes sont : " + value.Processus.Steps[index + 1].step.name + "," + value.Processus.Steps[index + 2].step.name + "," + value.Processus.Steps[index + 3].step.name + "," + value.Processus.Steps[index + 4].step.name);

                    } else {
                        if (currentStep !== data.Processus.currentStep) {
                            alert(data.currentStep);
                            alert("etape inconnue");
                        } else {
                            $.ajax({
                                url: "processDefinition.json",
                                dataType: "json",
                                success: function (data) {
                                    $(data).each(function (index, value) {
                                        for (index = 0; index < data.Processus.Steps.length; index++) {
                                            var stepNames = JSON.stringify(data.Processus.Steps[index].step.name);
                                            var n = stepNames.includes(currentStep);
                                            if (n == false) {
                                                $("#currentStep").append("L'etape " + value.Processus.Steps[index].step.name + " avec l'indice suivant " + index + " n'est pas l'etape actuelle" + "</br>");

                                            } else if (currentStep === "documentApprouve") {
                                                $("#currentStep").append("L'etape actuelle est : " + currentStep);
                                                $("#nextStep").append("Ceci est L'etape finale");

                                            } else {
                                                for (var index = 0; index < value.Processus.Steps.length; index++) {
                                                    ongoingStep = value.Processus.Steps[index].step.name;
                                                    nextStep = value.Processus.Steps[++index].step.name;
                                                    $("#currentStep").append("L'etape actuelle est : " + ongoingStep);
                                                    $("#nextStep").append("L'etape suivante est : " + nextStep);
                                                }
                                            }
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

}



function doAction(schemaID, currentStep, userID, action) {
    processModule.getNextStep(schemaID, currentStep);
    if (dataFile.schemaID !== schemaID && dataFile.Processus.currentStep !== currentStep) {
        console.log("Donnees erronnes");
    } else {
        for (var i = 0; i < dataFile.Processus.Steps.length; i++) {
            if (dataFile.Processus.Steps[i].step.name === currentStep) {
                dataFile.Processus.currentStep = action;
                dataFile.Processus.Steps[i + 1].step.name = action;
                dataFile.Processus.Steps[i + 1].step.collaborateurs = userID;
                fs.writeFileSync('./JSONFiles/processData.json', JSON.stringify(dataFile));
            }
        }

    }
}



function revertProcess(userID, schemaID, action) {



}


//me.startProcess(1, 1, "verifierDocument");
//me.nextStep(1, "verifierDocument");
//me.getActions(1);

