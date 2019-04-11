// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMDeokqn-296HBz9PXgL_cjuix97w6B9Q",
  authDomain: "fir-project-2df0b.firebaseapp.com",
  databaseURL: "https://fir-project-2df0b.firebaseio.com",
  projectId: "fir-project-2df0b",
  storageBucket: "fir-project-2df0b.appspot.com",
  messagingSenderId: "34085689224"
};
firebase.initializeApp(config);

var database = firebase.database();

// ---------------------------------//

// create on.click function

$("#employee-form").on("submit", function (event) {
  event.preventDefault();


  // gather form data in an object
  var trainDataInput = {
    trainInput: $("#train-input").val().trim(),
    destinationInput: $("#destination-input").val().trim(),
    firstArrivalInput: $("#first-input").val().trim(),
    frequencyInput: $("#frequency-input").val().trim()
  };

  // add the object of data to firebase
  database.ref().push(trainDataInput);
});

// retrieve information from the firebase
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());
  console.log("this is child_added");

  // creates shortcut variable for childSnapshot.val();
  var trainData = childSnapshot.val();

  trainFrequency = trainData.frequencyInput;

  firstArrival = trainData.firstArrivalInput;

  firstArrivalConverted = moment(trainData.firstArrival, "HH:mm").subtract(1, "years");
  console.log(firstArrivalConverted);

  firstArrivalInteger = parseInt(firstArrival);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstArrivalInteger), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = parseInt(trainFrequency) - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  nextTrainFormatted = moment(nextTrain).format("HH:mm")

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");


  // get the information to the page

  var $tableRow = $("<tr>");
  $tableRow.addClass("text-center");

  var tdTrainName = $("<td>").text(trainData.trainInput);
  var tdDestination = $("<td>").text(trainData.destinationInput);
  var tdFrequency = $("<td>").text(trainData.frequencyInput);
  var tdNextArrival = $("<td>").text(nextTrainFormatted);
  var tdMinutesAway = $("<td>").text(tMinutesTillTrain);

  $tableRow.append(tdTrainName, tdDestination, tdFrequency, tdNextArrival, tdMinutesAway);

  $("tbody").append($tableRow);
})

// create table row
// create 6 <td> tags
// add content from childSnapshot.val() to the td tags except for total billed and total months worked
// append td tags to table row created
// append entire row to the $("tbody");