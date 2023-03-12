// Версія 2.0.0

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// =====================================================================
// Об'єкт start button
// =====================================================================
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

// =====================================================================
// Функція для виведення повідомлень
// =====================================================================
const MESSAGES = {
  success: 'Time is up!',
  failure: 'Please, choose date in future!',
};

function showNotification(type) {
  const message = MESSAGES[type];
  Notiflix.Notify[type](message);
}

// =====================================================================
// Налаштування flatpickr
// =====================================================================

let targetDate = null; // Ініціалізація дати в майбутньому

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[selectedDates.length - 1].getTime(); // Отримання дати в майбутньому
    if (targetDate > Date.now()) {
      // Якщо дата в майбутньому
      startButton.disabled = false; // Розблоковуємо start button
    } else {
      showNotification('failure'); // Інакше попереджуємо
      startButton.disabled = true; // Блокуємо start button
    }
  },
};

flatpickr('#datetime-picker', options);

// =====================================================================
// Клас таймера (аналогічно до лекції Репети)
// =====================================================================
class Timer {
  constructor(targetDate, { onTick = console.log, onStop = console.log }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.onTick = onTick;
    this.onStop = onStop;
  }

  start() {
    this.intervalId = setInterval(() => {
      const remainingTime = this.targetDate - Date.now();
      if (remainingTime < 0) {
        this.onStop('success');
        clearInterval(this.intervalId);
      } else {
        const remainingTimeUnits = convertMs(remainingTime);
        this.onTick(remainingTimeUnits);
      }
    }, 1000);
  }
}

// =====================================================================
// Слухач події на start button
// =====================================================================
startButton.addEventListener('click', () => {
  startButton.disabled = true; // деактивуємо button
  const timer = new Timer(targetDate, {
    onTick: updateClock,
    onStop: showNotification,
  }); // створимо таймер
  timer.start(); // Запускаємо таймер
});

// =====================================================================
// Рендеринг таймера
// =====================================================================
const timeUnits = ['days', 'hours', 'minutes', 'seconds'];
const timeElements = timeUnits.map(timeUnit =>
  document.querySelector(`.timer [data-${timeUnit}]`)
);

function updateClock(remaining) {
  timeElements.forEach((timeElement, i) => {
    const value = remaining[timeUnits[i]].toString().padStart(2, '0');
    timeElement.textContent = value;
  });
}

// =====================================================================
// Функція конвертації мілісекунд в об'єкт {дні, години, хвидини, секнди}
// =====================================================================
function convertMs(ms) {
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
