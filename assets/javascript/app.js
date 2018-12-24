// Initialize Firebase

var config = {
  apiKey: "AIzaSyD7SlfClHfWrphIC66N-5iWK81Yu7emTJY",
  authDomain: "train-schedule-91ddf.firebaseapp.com",
  databaseURL: "https://train-schedule-91ddf.firebaseio.com",
  projectId: "train-schedule-91ddf",
  storageBucket: "",
  messagingSenderId: "627073607670"
};
firebase.initializeApp(config);

var database = firebase.database();

var nextTrain, 
currentTime, 
minsAway;

var timeLogic = function(firstTrain, frequency) {
  var oneYearAgo = moment(firstTrain, "HH:mm").subtract(1, "years");
  // console.log(oneYearAgo);

  currentTime = moment();
  console.log( "CURRENT TIME: " + moment(currentTime).format( "hh:mm"));

  var diffTime = moment().diff(moment(oneYearAgo), "days");
  // console.log( "DIFFERENC IN TIME:" + diffTime);

  var tRemainder = diffTime % frequency;
  // console.log(tRemainder);

  minsAway = frequency - tRemainder;
  // console.log( "MINUTES TILL TRAIN: " + minsAway);

  nextTrain = moment().add(minsAway, "minutes");
  // console.log( "ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));//
};

  $( "#add-traintime-btn" ).on( "click", function(event){
    event.preventDefault();

    var trainName = $( "#train-input").val().trim();
    var destination = $( "#dest-input" ).val().trim();
    var firstTrain = moment($( "#first-train-input" ).val().trim(), "HH:mm" ).format("X");
    var frequency = $( "#freq-input" ).val().trim();

    var newTrain = {
      train: trainName,
      destination: destination,
      firTrain: firstTrain,
      frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firTrain);
    console.log(newTrain.frequency);

    alert( "Train successfully added" );
    $("#train-input").val( "" );
    $("#dest-input").val( "" );
    $("#first-train-input").val( "" );
    $("#freq-input").val( "" );


  } );
 database.ref().on( "child_added", function(childSnapshot){
  console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train
    var destination = childSnapshot.val().destination
    var firstTrain = childSnapshot.val().firTrain
    var frequency = childSnapshot.val().frequency

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    timeLogic(firstTrain, frequency);

    var newRow = $( "<tr>" ).append(
      $( "<td>" ).text(trainName),
      $( "<td>" ).text(destination),
      $( "<td>" ).text(frequency),
      $( "<td>" ).text(nextTrain),
      $( "<td>" ).text(minsAway),
      
    );
    
    $( "#train-table > tbody").append(newRow);


    // var date = "2018-12-24";
    // var dateString = moment(date).add({day:1, months: 6}).format("l");

    // var format = "LLLL";
    // var result = moment(date).endOf("week");
    // console.log(dateString);
    // console.log(result);
 });