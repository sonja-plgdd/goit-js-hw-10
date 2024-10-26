import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import svgFile from "../img/symbol-defs.svg";
const form = document.querySelector('.form');


form.addEventListener('submit', handleSumbit);

function handleSumbit(event) {
  event.preventDefault();
  const checkedRadio = document.querySelector('input[name="state"]:checked');
  const userInput = document.querySelector('input[name="delay"]');
  
  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (checkedRadio.value === 'fulfilled') {
        resolve(`Fulfilled promise in ${userInput.value}ms`);
      }
      else if (checkedRadio.value === 'rejected') {
        reject(`Rejected promise in ${userInput.value}ms`
);
      }
    })
      .then((result) => {
        iziToast.show({
          message: result,
          backgroundColor: '#59A10D',
          messageColor: '#fff',
          iconURL: `${svgFile}#icon-bi_check2-circle`,
          iconColor: '#fff',
          position: "topRight"
      });
      })
      .catch((error) => {
        iziToast.show({
          message: error,
          messageColor: '#fff',
          iconURL: `${svgFile}#icon-octagon`,
          position: "topRight",
          backgroundColor: '#ef4040',
      });
      })
  }, userInput.value);
}

