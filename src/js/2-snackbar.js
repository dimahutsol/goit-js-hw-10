import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputFulfilled: document.querySelector('[value="fulfilled"]'),
  inputRejected: document.querySelector('[value="rejected"]'),
};

refs.form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const delay = refs.inputDelay.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (refs.inputFulfilled.checked) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        backgroundColor: '#59A10D',
        messageColor: '#FFFFFF',
      })
    )
    .catch(delay =>
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
      })
    );
}
