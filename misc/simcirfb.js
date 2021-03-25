// import firebase from "firebase/app";
// import "firebase/storage";
// import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCt45QFC8PO-60QN2MMeX__20P4Z-Qja9c",
    authDomain: "ld101-d326f.firebaseapp.com",
    projectId: "ld101-d326f",
    storageBucket: "ld101-d326f.appspot.com",
    messagingSenderId: "845780335610",
    appId: "1:845780335610:web:357c093d872b864fe44243"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var username = '';

var queryString = window.location.search || '';
var keyValPairs = [];
var params      = {};
queryString     = queryString.substr(1);

if (queryString.length)
{
   keyValPairs = queryString.split('&');
   for (var pairNum in keyValPairs)
   {
      var key = keyValPairs[pairNum].split('=')[0];
      if (!key.length) continue;
      if (typeof params[key] === 'undefined')
         params[key] = [];
      params[key].push(keyValPairs[pairNum].split('=')[1]);
   }
}

function mySubmitFunction() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();
    // Create a storage reference from our storage service
    var storageRef = storage.ref();
    // Get the circuit data
    var data = getUserData();
    // Get the file path to store the file
    var pathStr = getFilePath();
    var pathFile = storageRef.child(pathStr);
    // Sore the file in the ref path
    pathFile.put(data).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });      
    console.log(pathStr);
};

var textFile = null;
function makeTextFile() {
    // var text = "The rain in spain";
    // var data = new Blob([text], {type: 'text/plain'});
    var data = getUserData();

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    var dwnldlink = document.getElementById('download');
    dwnldlink.href = textFile;
    dwnldlink.download = 'circuit.json';

    return textFile;
};


function getUserData() {
    // Gather the circuit data
    var $s = simcir;
    var $simcir = $('#circuit');
    var getCircuitData = $s.controller($simcir.find('.simcir-workspace') ).text();
    var data = new Blob([getCircuitData], {type: 'text/plain'});
    return data;
}

function getFilePath() {
    // When we store the circuit in the firebase storage we want to create a 
    // directory structure of the following form:
    //     courseID/userID/Circuit
    var userID = params.userID.toString();
    var courseID = params.courseID.toString();
    var sectionID = params.sectionID.toString();
    var subsectionID = params.subsectionID.toString();
    var unitID = params.unitID.toString();

    if (!userID) {
        userID = "nouid";
    }
    if (!courseID) {
        courseID = "nocid";
    }
    if (!sectionID) {
        sectionID = "nosecid";
    }
    if (!subsectionID) {
        subsectionID = "nosubsecid";
    }
    if (!unitID) {
        unitID = "nounitid";
    }

    var pathStr = courseID+'/'+userID+'/'+sectionID+'/'+subsectionID+'/'+unitID+'.json';    
    return pathStr;
}


    