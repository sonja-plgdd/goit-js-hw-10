import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import svgFile from "../img/symbol-defs.svg";
const form = document.querySelector('.form');


form.addEventListener('submit', handleSumbit);

function handleSumbit(event) {
  event.preventDefault();
  const checkedRadio = document.querySelector('input[name="state"]:checked');
  const userInput = document.querySelector('input[name="delay"]');
  const delay = userInput.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkedRadio.value === 'fulfilled') {
        resolve(delay);
      }
      else if (checkedRadio.value === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then((result) => {
      iziToast.show({
        message: `Fulfilled promise in ${result}ms`,
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        iconURL: `${svgFile}#icon-bi_check2-circle`,
        iconColor: '#fff',
        position: "topRight"
      });
    })
    .catch((error) => {
      iziToast.show({
        message: ` Rejected promise in ${error}ms`,
        messageColor: '#fff',
        iconURL: `${svgFile}#icon-octagon`,
        position: "topRight",
        backgroundColor: '#ef4040',
      });
    })
}

