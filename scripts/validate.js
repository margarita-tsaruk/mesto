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
 * @param {HTMLFormform} inputList
 */
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButton(inputList, buttonElement);
    });
 });
}

//Проверить невалидность полей ввода (применить функцию если хотя бы 1 поле невалидно)
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//Включить и отключить состояние кнопки при проверки валидности полей формы
function toggleButton(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.removeAttribute('disabled', 'disabled');
  }
}

//Проверить полей ввода на валидность
function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

//Показать сообщение об ошибке в полях ввода
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  inputElement.classList.add('popup__input_type_invalid');
}

//Скрыть сообщение об ошибке в полях ввода
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_invalid');
  errorElement.textContent = '';
}




