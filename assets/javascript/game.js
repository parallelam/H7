// Standard document ready function:

$(document).ready(function(){
    
    // Firebase initialization and variable declarations:
    
    var config = {
        apiKey: "AIzaSyDeU0I4kg-uRLn8jcSk5_ukVFou4jaJOVI",
        authDomain: "multiplayer-rps-4a54e.firebaseapp.com",
        databaseURL: "https://multiplayer-rps-4a54e.firebaseio.com",
        projectId: "multiplayer-rps-4a54e",
        storageBucket: "",
        messagingSenderId: "909026724848"
      };
    firebase.initializeApp(config);
    var database = firebase.database();
    var pOneWins = 0, pOneLosses = 0;
    var pTwoWins = 0, pTwoLosses = 0;
    var ties = 0;
    var pOneGuess = '';
    var pTwoGuess = '';
    
    database.ref().set({
        pOneWins:0,
        pOneLosses:0,
        pTwoWins:0,
        pTwoLosses:0,
        ties:0
      });
    
    database.ref().on("value", function(snapshot) {
        console.log(snapshot.val())});

    function gameLogic(){
        if ((pOneGuess === 'rock') || (pOneGuess === 'paper') || (pOneGuess === 'scissors')) {
            if ((pOneGuess === 'rock') && (pTwoGuess === 'rock')) {
                ties++;
            }
            if ((pOneGuess === 'paper') && (pTwoGuess === 'paper')) {
                ties++;
            }
            if ((pOneGuess === 'scissors') && (pTwoGuess === 'scissors')) {
                ties++;
            }
            if ((pOneGuess === 'rock') && (pTwoGuess === 'scissors')) {
                pOneWins++;
                pTwoLosses++;
            }
            if ((pOneGuess === 'rock') && (pTwoGuess === 'paper')) {
                pOneLosses++;
                pTwoWins++;
            }
            if ((pOneGuess === 'paper') && (pTwoGuess === 'rock')) {
                pOneWins++;
                pTwoLosses++;
            }
            if ((pOneGuess === 'paper') && (pTwoGuess === 'scissors')) {
                pOneLosses++;
                pTwoWins++;
            }
            if ((pOneGuess === 'scissors') && (pTwoGuess === 'paper')){
                pOneWins++;
                pTwoLosses++;
            }
            if ((pOneGuess === 'scissors') && (pTwoGuess === 'rock')) {
                pOneLosses++;
                pTwoWins++;
            }
    }}

    $('#p1wins').text('Wins: '+pOneWins); $('#p1losses').text('Losses: '+pOneLosses);
    $('#p2wins').text('Wins: '+pTwoWins); $('#p2losses').text('Losses: '+pTwoLosses);
    $('#ties').text('Ties: '+ties);


    // Victory conditions = 3 / 5 games won.
    

    // Function to set default text and change theme:
    $('.js-change-theme').text('Switch to a Brighter Display').on('click', function changeTheme (){
        var body = $(document.body), btns = $('.z');
        if (body.hasClass('t--dark')) {
            body.removeClass('t--dark');
            btns.removeClass('btn-secondary');
            body.addClass('t--light');
            btns.addClass('btn-dark');
            $('.js-change-theme').text('Switch to a Darker Display');
        } else {
            body.removeClass('t--light');
            body.addClass('t--dark');
            btns.addClass('btn-secondary');
            btns.removeClass('btn-dark');
            $('.js-change-theme').text('Switch to a Brighter Display');
        }}); 
    
})