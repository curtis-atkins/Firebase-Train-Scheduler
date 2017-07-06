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
            var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
            console.log(trainTimeConverted);

            //time at the current moment
            var timeNow = moment();
            console.log("The Time Now Is: " + moment(timeNow).format("hh:mm"));

            //Difference in first train time and current time
            var timeDif = moment().diff(moment(trainTimeConverted), "minutes");
            console.log("Time Difference is: " + ((timeDif/8760)-frequency));

            var trainModulo = timeDif % frequency;
            console.log(trainModulo);

            trainMinutesLeft =  frequency - trainModulo;
            console.log("Train will arrive in: " + trainMinutesLeft);

            var minutesAway = moment().subtract(trainMinutesLeft, "minutes");
            console.log("Train will arrive at " + moment(minutesAway).format("HH:mm"));
            $('#traktTable > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + trainTime + "</td><td>" + minutesAway + "</td><td>" + trainMinutesLeft + "</td></tr>");
        });
    });
});