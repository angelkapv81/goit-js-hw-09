// Можно решить задачу следующим образом:

// Найти кнопки в HTML с помощью метода querySelectorAll.
// Назначить обработчики событий на каждую из кнопок.
// Внутри обработчика событий для кнопки «Start»:
// Запустить таймер, который каждую секунду будет менять цвет фона.
// Отключить кнопку «Start», чтобы ее нельзя было нажать во время работы таймера.
// Внутри обработчика событий для кнопки «Stop»:
// Остановить таймер.
// Включить кнопку «Start».

// Обратите внимание, что в этом решении используется переменная timerId,
// которая хранит идентификатор таймера, чтобы можно было остановить его позже при нажатии на кнопку «Stop».
// Кроме того, мы используем свойство disabled для отключения/включения кнопки «Start».
//

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId;

startBtn.addEventListener('click', () => {
  // Отключаем кнопку «Start»
  startBtn.disabled = true;

  // Запускаем таймер, который каждую секунду будет менять цвет фона
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  // Останавливаем таймер
  clearInterval(timerId);

  // Включаем кнопку «Start»
  startBtn.disabled = false;
});
