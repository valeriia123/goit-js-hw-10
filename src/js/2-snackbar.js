// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const formEl = document.querySelector(".form");
const inputEl = document.querySelector("input");
const btnEl = document.querySelector("button");

formEl.style.width = '250px';
inputEl.style.height = '20px';

const createPromise = (delay, state) => {
   return new Promise((resolve, reject) => {
       setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else if (state === 'rejected') {
                reject(delay);
            }

        }, delay)
    })
}
// createPromise();



formEl.addEventListener('submit', event => {
    event.preventDefault();
    const delay = Number(formEl.elements.delay.value || 0);
    const state = formEl.elements.state.value || 'fulfilled';

    createPromise(delay, state)
        .then(delay => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`
            });
            console.log(`✅ Fulfilled promise in ${delay}ms`)
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`
            })
            console.log(`❌ Rejected promise in ${delay}ms`);
        })
})