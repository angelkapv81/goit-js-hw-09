function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId;

startBtn.addEventListener('click', () => {
  // Вимикаємо кнопку «Start»
  startBtn.disabled = true;

  // Запускаємо таймер, який кожну секунду буде змінювати колір фону
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  // Зупиняємо таймер
  clearInterval(timerId);

  // Вмикаємо кнопку «Start»
  startBtn.disabled = false;
});
