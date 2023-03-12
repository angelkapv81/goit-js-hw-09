import Notiflix from 'notiflix';

// =====================================================================
// Створення промісу
// =====================================================================
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// =====================================================================
// Об'єкт форми
// =====================================================================

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const [delay, step, amount] = [
    Number(form.elements.delay.value),
    Number(form.elements.step.value),
    Number(form.elements.amount.value),
  ];

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const promiseDelay = delay + step * i;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        const message = `✅ Fulfilled promise ${position} in ${delay}ms`;
        Notiflix.Notify.success(message, { timeout: 2000 });
      })
      .catch(({ position, delay }) => {
        const message = `❌ Rejected promise ${position} in ${delay}ms`;
        Notiflix.Notify.failure(message, { timeout: 2000 });
      });
  }
});
