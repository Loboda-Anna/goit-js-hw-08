import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('form input'),
  messageEl: document.querySelector('form textarea'),
};
const formData = {
  email: '',
  message: '',
};
const savedValue = localStorage.getItem(STORAGE_KEY);
const parsedValue = JSON.parse(savedValue);

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

writeInForm();

function writeInForm() {
  if (parsedValue) {
    refs.emailEl.value = parsedValue.email;
    refs.messageEl.value = parsedValue.message;
  }
}
function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(parsedValue);
  refs.form.reset();
  localStorage.removeItem(STORAGE_KEY);
}
