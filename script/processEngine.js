var uuid = require('uuid');
var fs = require('fs');
var path = require('path');
const schemaModel = require('../models/schemaModel');
const schemaData = require('../models/schemaData');
var file = require('../JSONFiles/processSchema.json');
var def = require('../JSONFiles/processDefinition.json');
var eventDate = new Date();
const processModule = require("../processModule.js");
var $ = require('jquery');
var dataFile = require('../JSONFiles/processData.json');

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
                    var record = "<tr><td><a href='/tasks/viewJSON'>" + value.Processus.idInstance + "</a></td><td>" + value.Processus.Steps[index].step.name + "</td><td>" + value.Processus.Steps[index].step.nextStep + "</td><td>" + value.Processus.Steps[index].step.collaborateurs + "</td><td>" + value.Processus.Steps[index].step.state + "</td><td>" + value.Processus.Steps[index].step.condition + "</td><td>" + value.Processus.Steps[index].step.result + "</td></tr>" +
                        "<tr><td><a href='/tasks/viewJSON'>" + value.Processus.idInstance + "</a></td><td>" + value.Processus.Steps[index + 1].step.name + "</td><td>" + value.Processus.Steps[index + 1].step.nextStep + "</td><td>" + value.Processus.Steps[index + 1].step.collaborateurs + "</td><td>" + value.Processus.Steps[index + 1].step.state + "</td><td>" + value.Processus.Steps[index + 1].step.condition + "</td><td>" + value.Processus.Steps[index + 1].step.result + "</td></tr>" +
                        "<tr><td><a href='/tasks/viewJSON'>" + value.Processus.idInstance + "</a></td><td>" + value.Processus.Steps[index + 2].step.name + "</td><td>" + value.Processus.Steps[index + 2].step.nextStep + "</td><td>" + value.Processus.Steps[index + 2].step.collaborateurs + "</td><td>" + value.Processus.Steps[index + 2].step.state + "</td><td>" + value.Processus.Steps[index + 2].step.condition + "</td><td>" + value.Processus.Steps[index + 2].step.result + "</td></tr>" +
                        "<tr><td><a href='/tasks/viewJSON'>" + value.Processus.idInstance + "</a></td><td>" + value.Processus.Steps[index + 3].step.name + "</td><td>" + value.Processus.Steps[index + 3].step.nextStep + "</td><td>" + value.Processus.Steps[index + 3].step.collaborateurs + "</td><td>" + value.Processus.Steps[index + 3].step.state + "</td><td>" + value.Processus.Steps[index + 3].step.condition + "</td><td>" + value.Processus.Steps[index + 3].step.result + "</td></tr>" +
                        "<tr><td><a href='/tasks/viewJSON'>" + value.Processus.idInstance + "</a></td><td>" + value.Processus.Steps[index + 4].step.name + "</td><td>" + value.Processus.Steps[index + 4].step.nextStep + "</td><td>" + value.Processus.Steps[index + 4].step.collaborateurs + "</td><td>" + value.Processus.Steps[index + 4].step.state + "</td><td>" + value.Processus.Steps[index + 4].step.condition + "</td><td>" + value.Processus.Steps[index + 4].step.result + "</td></tr>";
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
function startProcess(userID, fileID,condition,result) {
    processModule.fileParser();
    processModule.makeInstance(fileID);
      if (fileID !== dataFile.schemaID) {
          console.log("erreur");

      } else {
          console.log("L'id du schema est : " + fileID);
          let col = def.Processus.Steps[0].step.collaborateurs;
          dataFile.Processus.currentStep = "brouillonPret";
          dataFile.Processus.Steps[0].step.condition=condition;
          dataFile.Processus.Steps[0].step.result=result;
          dataFile.Processus.Steps[0].step.collaborateurs = userID;
          fs.writeFileSync('./JSONFiles/processData.json', JSON.stringify(dataFile));
      }
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



function doAction(schemaID, currentStep, userID, action,condition,result) {
    var def = require('../JSONFiles/processDefinition.json');
    processModule.getNextStep(schemaID, currentStep);
    if (dataFile.schemaID !== schemaID && dataFile.Processus.currentStep !== currentStep) {
        console.log("Donnees erronnes");
    } else {
        for (var i = 0; i < dataFile.Processus.Steps.length; i++) {
            if (dataFile.Processus.Steps[i].step.name == currentStep) {
                console.log(def.Processus.Steps)
                dataFile.Processus.currentStep = action;
                dataFile.Processus.Steps[i+1].step.name = action;
                dataFile.Processus.Steps[i+1].step.state = def.Processus.Steps[i+1].step.state;
                dataFile.Processus.Steps[i+1].step.nextStep = def.Processus.Steps[i+1].step.nextStep;
                dataFile.Processus.Steps[i+1].step.collaborateurs = userID;
                dataFile.Processus.Steps[i+1].step.condition = condition;
                dataFile.Processus.Steps[i+1].step.result = result;
                fs.writeFileSync('./JSONFiles/processData.json', JSON.stringify(dataFile));
                console.log(def.Processus.Steps[i+1].step.state);
            }else {
                console.log("???");
            }
        }

    }
}



function revertProcess(userID, schemaID, action) {



}
module.exports = {hello, revertProcess,startProcess,getActions,getHistory, nextStep, getTasks,doAction};

//me.nextStep(1, "verifierDocument");
//me.getActions(1);

