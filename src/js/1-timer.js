// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
  
  const buttonStart = document.querySelector('button');
  const inputEl = document.querySelector('input');
  const divEls = document.querySelectorAll('.field');
  const timerContainer = document.querySelector('.timer');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            alert('Please choose a date in the future');
            buttonStart.disabled = true;
        } else {
            buttonStart.disabled = false;
            userSelectedDate.deadline = selectedDates[0];
      }
    }
};
  
  flatpickr(inputEl, options);

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
  
      return {
          days,
          hours,
          minutes,
          seconds
      }
}
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

    
  // ==== STYLES ==== //
  timerContainer.style.display = 'flex';
  timerContainer.style.gap = '15px';
  timerContainer.style.marginTop = '20px';
  
  divEls.forEach(el => {
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.gap = '3px';
    });
    // ==== STYLES ==== //
    
    
let userSelectedDate = {
    deadline: null,
    intervalId: null,
    elements: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
    },

    start() {
        if (!this.deadline) {
            alert('Please, choose a date!');
            return;
        }

        inputEl.disabled = true;
        buttonStart.disabled = true;
        this.intervalId = setInterval(() => {
            const diff = this.deadline - Date.now();

            if (diff <= 0) {
                this.stop();
                inputEl.disabled = false;
                return;
            }

            const timerComponents = convertMs(diff);

            this.elements.days.textContent = this.pad(timerComponents.days);
            this.elements.hours.textContent = this.pad(timerComponents.hours);
            this.elements.minutes.textContent = this.pad(timerComponents.minutes);
            this.elements.seconds.textContent = this.pad(timerComponents.seconds);
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);
    },

    pad(value) {
        return String(value).padStart(2, '0');
    }
};
buttonStart.addEventListener('click', () => userSelectedDate.start());