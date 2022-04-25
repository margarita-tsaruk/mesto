/**
 * Обработать событие валидации формы
 * @param {SubmitEvent} event
 * @param {HTMLFormform} forms
 */
function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));

  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement);
  });

}

enableValidation();

/**
 * Добавить слушатель событий всем полям ввода внутри формы
 * @param {HTMLFormform} inputs
 */
function setEventListeners(formElement) {
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButton(inputs, buttonElement);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButton(inputs, buttonElement);
    });
 });
}

//Проверить полей ввода на валидность
const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

//Проверить невалидность полей ввода (применить функцию если хотя бы 1 поле невалидно)
function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//Включить и отключить состояние кнопки при проверки валидности полей формы
const toggleButton = (inputs, buttonElement) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
};


//Показать сообщение об ошибке в полях ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_invalid');
  errorElement.textContent = errorMessage;
}

//Скрыть сообщение об ошибке в полях ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_invalid');
  errorElement.textContent = '';
}




