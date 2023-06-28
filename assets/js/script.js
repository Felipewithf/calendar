// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentDayEl = $('#currentDay');
var currentWorkdayEl = $('#workday');
var containerLargeEl = $('.container-lg');

currentWorkdayEl.text("Workday starts from 9am to 5pm everyday");

var currentDate;


$(function () {

  function saveOnLocal() {
    console.log("we got it");
  };

  //loop to make the time blocks, add ids and classes
  for (let index = 9; index < 18; index++) {

    var parentDivEl =  $("<div>").attr('id',index);
    parentDivEl.addClass("row time-block");
    parentDivEl.addClass(timeCheck(index));
    containerLargeEl.append(parentDivEl);
  
    var saveButtonEl = $("<button>");
    saveButtonEl.addClass("btn saveBtn col-2 col-md-1");

    var textareaEl = $("<textarea>");
    textareaEl.addClass("col-8 col-md-10 description");

    var childDivEl = $("<div>").text(timeInPmOrAm(index));
    childDivEl.addClass("col-2 col-md-1 hour text-center py-3");

    parentDivEl.append(childDivEl,textareaEl,saveButtonEl);

    var saveIconEl = $("<i>");
    saveIconEl.addClass("fas fa-save");
    saveButtonEl.append(saveIconEl);

    
    
  };

  //return time in PM or AM
  function timeInPmOrAm(index){
    var time = index;
    if(time < 12){
      return ( `${time} AM`);
    }else{
      return ( `${time} PM`);
    }
  };

  //check for the time of the date and add a class
  function timeCheck(index){
      var currentHour = dayjs().format("H");
      if(currentHour == index){
        console.log("present");
        return ("present");
      }else if(currentHour > index){
        console.log("past");
        return ("past");
      }else{
        console.log("future");
        return ("future");
      }

  };

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  //interval to check for current date and time
  currentDate = setInterval(()=>{
    var today = dayjs();
    currentDayEl.text(today.format("dddd MMM D, YYYY"));
  },1000)

// event listners go here
  $("body").on("click",".saveBtn",saveOnLocal);

});
