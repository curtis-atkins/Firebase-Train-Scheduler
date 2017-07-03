$(document).ready(function() {
    var database = firebase.database();
    // Capture Button Click
    $("#addTrain").on("click", function(event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();
        // Capture user inputs and store them into variables
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val().trim();
        var frequency = $("#frequency").val().trim();
        //var nextArrival = $("#nextArrival").val().trim();
        //initial data for firebase database
        database.ref().set({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
            //nextArrival: nextArrival
        });
    });
    //firebase watcher
    database.ref().on("value", function(snapshot) {
        // Console log each of the user inputs to confirm we are receiving them
        console.log(snapshot.val());
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().trainTime);
        console.log(snapshot.val().frequency);
        //console.log(snapshot.val().nextArrival);
        // Updates the input in the form
        $("#traktTrainName").html(snapshot.val().trainName);
        $("#traktDestination").html(snapshot.val().destination);
        $("#traktTrainTime").html(snapshot.val().trainTime);
        $("#traktFrequency").html(snapshot.val().frequency);
        //$("#nextArrival").html(snapshot.val().nextArrival);
        /*
              // Output all of the new information into the relevant sections
              $("#traktTrainName").html(trainName);
              $("#traktDestination").html(destination); 
              $("#traktTrainTime").html(trainTime);
              $("#traktFrequency").html(frequency);
             // $("#nextArrival").html(nextArrival);
        */
        $("#form").get(0).reset()
    });
    // Clear localStorage
    localStorage.clear();
    /*      // Store all content into localStorage
          localStorage.setItem("trainName", trainName);
          localStorage.setItem("destination", destination);
          localStorage.setItem("frequency", frequency);
          localStorage.setItem("minutesAway", minutesAway);
          
        });

        // By default display the content from localStorage
        $("#name-display").html(localStorage.getItem("trainName"));
        $("#comment-display").html(localStorage.getItem("destination"));
        $("#email-display").html(localStorage.getItem("frequency"));
        $("#age-display").html(localStorage.getItem("minutesAway"));
        
    */
    // Whenever a user clicks the restart button
    $("#restart-button").on("click", function() {
        // Set the clickCounter back to initialValue
        clickCounter = initialValue;
        // Save new value to Firebase
        database.ref().set({
            clickCount: clickCounter
        });
        // Log the value of clickCounter
        console.log(clickCounter);
        // Change the HTML Values
        $("#click-value").html(clickCounter);
    });
});