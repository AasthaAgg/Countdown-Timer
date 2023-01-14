const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

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

    // Populating Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;
    //show Countdown
    countdownEl.hidden = false;
}

// Take values from Input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    //Get number version of current Date, and update DOM
    countdownValue = new Date(countdownDate).getTime();
    // updateDOM every second
    countdownActive = setInterval(updateDOM, 1000);
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);