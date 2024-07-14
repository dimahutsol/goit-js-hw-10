import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  inputTime: document.querySelector('#datetime-picker'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.startBtn.setAttribute('disabled', '');
      return iziToast.info({
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
    }

    refs.startBtn.removeAttribute('disabled');
    userSelectedDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', handleStartBtnClick);

function handleStartBtnClick() {
  refs.startBtn.setAttribute('disabled', '');
  refs.inputTime.setAttribute('disabled', '');

  const timeIntervalId = setInterval(() => {
    const timeDifference = userSelectedDate - Date.now();

    if (timeDifference < 1000) {
      refs.startBtn.removeAttribute('disabled');
      refs.inputTime.removeAttribute('disabled');
      clearInterval(timeIntervalId);
    }

    const timeToShow = convertMs(timeDifference);
    const formattedTimeToShow = formateTime(timeToShow);
    renderTime(formattedTimeToShow);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formateTime({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return { days, hours, minutes, seconds };
}

function renderTime({ days, hours, minutes, seconds }) {
  refs.spanDays.innerHTML = days.toString().padStart(2, '0');
  refs.spanHours.innerHTML = hours.toString().padStart(2, '0');
  refs.spanMinutes.innerHTML = minutes.toString().padStart(2, '0');
  refs.spanSeconds.innerHTML = seconds.toString().padStart(2, '0');
}
