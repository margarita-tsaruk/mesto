

function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  const inputs = form.querySelectorAll(config.inputSelector);

//  forms.forEach((form) => {
form.addEventListener('submit', (event) => handleFormSubmit(event, form));
//  })

  inputs.forEach((element) => {
    element.addEventListener('input', (event) => handleFormInput(event, form, config));
 })

  toggleButton(form, config);
}

function toggleButton(form, config) {
  const button = document.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle('popup__button_disabled', !form.checkValidity());
}

/**
 * Обработать событие валидации формы
 * @param {SubmitEvent} event
 * @param {HTMLFormform} form
 */
function handleFormSubmit(event, form) {
  event.preventDefault();

    if (form.checkValidity()) {
    alert('Form is valid');
  } else {
    alert('Not valid');
  }
}

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
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
});
