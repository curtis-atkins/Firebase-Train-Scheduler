$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBYSDE8XErwXioIOf45G6rHUzKTbkQfhxc",
        authDomain: "train-trakt-project.firebaseapp.com",
        databaseURL: "https://train-trakt-project.firebaseio.com",
        projectId: "train-trakt-project",
        storageBucket: "",
        messagingSenderId: "879287267273"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    // Capture Button Click
    $("#addTrain").on("click", function(event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();
        // Put user inputs into variables
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val().trim();
        var frequency = $("#frequency").val().trim();
        //initial data for firebase database
        var newTrain = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        };
        database.ref().push(newTrain);
        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.trainTime);
        console.log(newTrain.frequency);
        //Clear form  
        $("#form").get(0).reset();
        //firebase watcher
        database.ref().on("child_added", function(childSnapshot, prevChildKey) {
            //New Train Details
            var trainName = childSnapshot.val().trainName;
            var destination = childSnapshot.val().destination;
            var trainTime = childSnapshot.val().trainTime;
            var frequency = childSnapshot.val().frequency;
            //convert train time
            var momentMath = (moment(trainTime, "HH:mm").diff(moment(), "minutes"));
            console.log(momentMath);
            nextArrival = (momentMath / frequency);
            console.log(nextArrival);
            var minutesAway = "";
            $('#traktTable > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + trainTime + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
        });
    });
});