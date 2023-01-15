const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute('min', today);

// Populate Countdown
function updateDOM(){
    const now = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60000);    // get time in local time zone
    const diffInTime = countdownValue - now;

    const days = Math.floor(diffInTime / day);
    const hours = Math.floor((diffInTime % day) / hour);
    const minutes = Math.floor((diffInTime % hour) / minute);
    const seconds = Math.floor((diffInTime % minute) / second);

    // Hide Input
    inputContainer.hidden = true;

    // If the countdown has ended, show complete
    if (diffInTime < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
    } 
    // Else, show the countdown in progress
    else {        
        // Populating Countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;

        //show Countdown, hide
        completeEl.hidden = true;
        countdownEl.hidden = false;
    }
}

// Take values from Input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    if(countdownTitle === ''){
        alert("Please enter a title for what you're counting to.")
    }
    else if(countdownDate === ''){
        alert('Please select a date for the countdown.');
    }
    else {
        //Get number version of current Date, and update DOM
        countdownValue = new Date(countdownDate).getTime();
        // updateDOM every second
        countdownActive = setInterval(updateDOM, 1000);
    }
}

// Reset All values
function reset(){
    // Hide Countdowns, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    // Stop Countdown
    clearInterval(countdownActive);

    // Reset Values
    countdownTitle = '';
    countdownDate = '';
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);