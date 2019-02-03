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

    // Global variables for manipulation events:
    var name;
    var destination;
    var trainOne;
    var frequency = 0;

    $("#add-train").on("click", function(event) {
        event.preventDefault();
        // Storing and retreiving new data:
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        initialTrain = $("#first-train").val().trim();
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
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequence = childSnapshot.val().frequency;
        var trainArrival = childSnapshot.val().trainOne;
        var currentDayTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        console.log(currentDayTime);
        // Establish default time so first train comes in correct order:
        var firstTrainNew = moment(trainArrival, "hh:mm").subtract(1, "days");
        // Differential between current and trainOne:
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % frequence;
        // Time Until Next Arrival, ie tuna; differential before next train:
        var tuna = frequence - remainder;
        // moment().endOf('day').fromNow(upcomingTrain); moment().add(1, 'days').calendar()
        // Succeeding train:
        var nextArrival = moment().add(tuna, "minutes").format('MMMM Do YYYY, [at] h:mm a');
        var tuna1 = moment(nextArrival).diff(moment(tuna), 'hh:mm');
        // Function to convert to an hourhour:minuteminute format: 
        var frequencyDisplay = function convertMinsToHrsMins(tuna) {
            var h = Math.floor(frequence / 60);
            var m = frequence % 60;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            return h + ':' + m;
          };
        // Manipulate DOM to reflect changes:
        $("#add-row").append("<tr class='t-menu__item t-border'><td>" + name +
                "</td><td>" + destination +
                "</td><td class='centered'>" + frequence +
                "</td><td class='centered'>" + nextArrival + 
                "</td><td class='centered'>" + tuna + "</td></tr>");
            // Error logging:
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });
    // Click function that changes theme between dark display, night display and certain button types:
    $(document).on('click', '.js-change-theme', function changeTheme (event){
        event.preventDefault();
        var body = $(document.body);
        var btns = $('.z');
        if (body.hasClass('t--dark')) {
            body.removeClass('t--dark');
            btns.removeClass('btn-primary')
            body.addClass('t--light');
            btns.addClass('btn-success');
            $('.js-change-theme').text('Switch to a Darker Display')
        } else {
            body.removeClass('t--light');
            body.addClass('t--dark');
            btns.addClass('btn-primary');
            btns.removeClass('btn-success');
            $('.js-change-theme').text('Switch to a Brighter Display')
        }});
    
    // Sets default text and displays for item that is toggleable on page load:
    $('.js-change-theme').text('Switch to a Brighter Display'); $('#add-train').text('Submit');
});