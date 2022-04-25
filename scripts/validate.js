function enableValidation(config) {
  const forms = document.querySelectorAll('.popup__form');

  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  })
}

function setEventListeners(formElement) {
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButton(inputs, buttonElement);
    });
 })
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_invalid');
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_invalid');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}




//function toggleButton(form, config) {

 // button.disabled = !form.checkValidity();
// button.classList.toggle('popup__button_disabled', !form.checkValidity());
//}

/**
 * Обработать событие валидации формы
 * @param {SubmitEvent} event
 * @param {HTMLFormform} form
 */


function handleFormInput(event, form, config) {
  const input = event.target;
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    error.textContent = '';
  } else {
   error.textContent = input.validationMessage;
  }

  toggleButton(form, config);
}

enableValidation({
  formSelector: '',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
});
