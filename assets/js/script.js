
var currentDayEl = $('#currentDay');
var currentWorkdayEl = $('#workday');
var containerLargeEl = $('.container-lg');

var currentDate;

$(function () {

  //interval to check for current date and time
  currentDate = setInterval(() => {
    var today = dayjs();
    currentDayEl.text(today.format("dddd MMM D, YYYY"));
  }, 1000)


  //loop to make the time blocks, set ids, and classes
  for (let index = 9; index < 18; index++) {

    var parentDivEl = $("<div>").attr('id', `hour-${index}`);
    parentDivEl.addClass("row time-block");
    parentDivEl.addClass(timeCheck(index));//adds PM or AM
    containerLargeEl.append(parentDivEl);

    var saveButtonEl = $("<button>").attr('id', `${index}`);
    saveButtonEl.addClass("btn saveBtn col-2 col-md-1");

    var textareaEl = $("<textarea>").attr('id', `t-${index}`);
    textareaEl.addClass("col-8 col-md-10 description");

    var childDivEl = $("<div>").text(timeInPmOrAm(index));
    childDivEl.addClass("col-2 col-md-1 hour text-center py-3");

    parentDivEl.append(childDivEl, textareaEl, saveButtonEl);

    var saveIconEl = $("<i>");
    saveIconEl.attr("aria-hidden", "true");
    saveIconEl.css("pointer-events", "none"); //added this to disable the click on icon
    saveIconEl.addClass("fas fa-save");
    saveButtonEl.append(saveIconEl);

    //load values from local storage - if available
    textareaEl.text(localStorage.getItem(`hour:${index}`));

  };

  //return time in PM or AM
  function timeInPmOrAm(index) {
    var time = index;
    if (time < 12) {
      return (`${time} AM`);
    } else if(time ==12){
      return (`${time} PM`);
    } else{
      time = time - 12;
      return (`${time} PM`);
      
    }
  };

  //check for the time of the date
  function timeCheck(index) {
    var currentHour = dayjs().format("H");
    if (currentHour == index) {
      return ("present");
    } else if (currentHour > index) {
      return ("past");
    } else {
      return ("future");
    }
  };

  //store the value on localStorage
  function saveOnLocal(event) {
    event.preventDefault();
    userChoice = event.target;
    var textFieldValue = $(`#t-${userChoice.id}`).val();
    localStorage.setItem(`hour:${userChoice.id}`, textFieldValue);
  };

  function clearSchedule() {
    localStorage.clear();
    $(".description").val("");

  }

  // event listners go here
  $("body").on("click", ".saveBtn", saveOnLocal);

  $(".clearBtnContainer").on("click", clearSchedule);

});
