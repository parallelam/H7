  // Document Ready function for dynamically rendered elements to function properly:
  $(document).ready(function(){

  // Initialize Firebase and establish FB variable: 
    var config = {
        apiKey: "AIzaSyBfH22rrIopY6Z8sgDlMMN8f_O8H73CKuI",
        authDomain: "train-scheduler-17d65.firebaseapp.com",
        databaseURL: "https://train-scheduler-17d65.firebaseio.com",
        projectId: "train-scheduler-17d65",
        storageBucket: "train-scheduler-17d65.appspot.com",
        messagingSenderId: "381406849084"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // Global variables for click events:
    var name;
    var destination;
    var trainOne;
    var frequency = 0;

    $("#add-train").on("click", function(event) {
        event.preventDefault();
        // Storing and retreiving new data:
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        trainOne = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        // Database manipulation:
        database.ref().push({
            name: name,
            destination: destination,
            trainOne: trainOne,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function(childSnapshot) {
        var minAway;
        // Establish default time so first train comes in correct order:
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        // Differential between current and trainOne:
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Time differential before next train:
        var minAway = childSnapshot.val().frequency - remainder;
        // Succeeding train:
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
        // Manipulate DOM to reflect changes:
        $("#add-row").append("<tr><td>" + childSnapshot.val().name +
                "</td><td>" + childSnapshot.val().destination +
                "</td><td>" + childSnapshot.val().frequency +
                "</td><td>" + nextTrain + 
                "</td><td>" + minAway + "</td></tr>");
            // Error logging:
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Manipulate DOM to reflect changes:
        $("#name-display").html(snapshot.val().name);
        $("#email-display").html(snapshot.val().email);
        $("#age-display").html(snapshot.val().age);
        $("#comment-display").html(snapshot.val().comment);
    });

    // Click function that changes theme between dark display, night display and certain button types:
    $(document).on('click', '.js-change-theme', function changeTheme (event){
        event.preventDefault();
        var body = $(document.body);
        var btns = $('.z');
        if (body.hasClass('t--dark')) {
            body.removeClass('t--dark');
            btns.removeClass('btn-light')
            body.addClass('t--light');
            btns.addClass('btn-dark');
            $('.js-change-theme').text('Switch to a Darker Display')
        } else {
            body.removeClass('t--light');
            body.addClass('t--dark');
            btns.addClass('btn-light');
            btns.removeClass('btn-dark');
            $('.js-change-theme').text('Switch to a Brighter Display')
        }});
    
    // Sets default text and displays for item that is toggleable on page load:
    $('.js-change-theme').text('Switch to a Brighter Display'); $('#add-train').text('Submit');
});