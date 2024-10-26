import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import svgFile from '../img/symbol-defs.svg';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
let selectedDate;
button.disabled = true;

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function(selectedDates) {
        selectedDate = selectedDates[0].getTime();
        if (selectedDate < Date.now()) {
            iziToast.show({
            color: '#ef4040',
            position: "topRight",
            message: 'Please choose a date in the future',
            messageColor: '#fff',
            iconUrl: `${svgFile}#icon-octagon`,
            iconColor: '#fff'
});
            button.disabled = true;
            return;
        }
        else {
            button.disabled = false;
        }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let countdownInterval;


button.addEventListener('click', function() {
    if (selectedDate) {
        countdownInterval = setInterval(() => {
            const timeLeft = selectedDate - Date.now();
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                button.disabled = true;
                input.disabled = false;
                return;
            }
        button.disabled = true;
        input.disabled = true;

        const result = convertMs(timeLeft);
        daysSpan.textContent = result.days;
        hoursSpan.textContent = result.hours;
        minutesSpan.textContent = result.minutes;
        secondsSpan.textContent = result.seconds;
            
        daysSpan.textContent = String(result.days).padStart(2, '0');
        hoursSpan.textContent = String(result.hours).padStart(2, '0');
        minutesSpan.textContent = String(result.minutes).padStart(2, '0');
        secondsSpan.textContent = String(result.seconds).padStart(2, '0');
        }, 1000);
    }
});
