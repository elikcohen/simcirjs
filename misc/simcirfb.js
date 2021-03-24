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
   for (pairNum in keyValPairs)
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

    // keyVal = $.parseQuery(window.location.toString);
    // username = window.location.search.substring(window.location.search.indexOf('user=') + 5);
    // userID = window.location.search.substring(window.location.search.indexOf('userID=') + 7);
    // courseID = window.location.search.substring(window.location.search.indexOf('courseID=') + 9);
    userID = params.userID.toString();
    courseID = params.courseID.toString();

    if (!userID) {
        userID = "nouid";
    }

    if (!courseID) {
        courseID = "nocid";
    }

    var $s = simcir;

    // var $simcir = document.getElementById('circuit');
    var $simcir = $('#circuit');
    var lastData = '';
  
    var getCircuitData = $s.controller($simcir.find('.simcir-workspace') ).text();
  
    var data = new Blob([getCircuitData], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    var pathFile = storageRef.child(courseID+'/'+userID+'/'+'/CircuitData.txt');
    pathFile.put(data).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      

    console.log("User " + username + " hit Save !");
};

var textFile = null;
function makeTextFile() {
    var text = "The rain in spain";
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    var dwnldlink = document.getElementById('download');
    dwnldlink.href = textFile;

    return textFile;
};
    