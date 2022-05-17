/**
//Объявление функции: создать показ сообщения об ошибке в полях ввода
function showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

//Объявление функции: создать скрытие сообщения об ошибке в полях ввода
function hideInputError(config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

//Объявление функции: показать/скрыть сообщение об ошибке в случае невалидности полей формы
function showErrorMessage(config, formElement, inputElement) {
    if(!inputElement.validity.valid) {
      showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(config, formElement, inputElement);
    }
}

//Объявление функции: проверить невалидность полей ввода (применить функцию если хотя бы 1 поле невалидно)
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
}

//Объявление функции: включить и отключить состояние активности кнопки при проверки валидности полей формы
function toggleButton(config, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
}


 * Объявление функции: добавить слушателя событий всем полям ввода внутри формы
 * @param {HTMLFormform} inputList

function setEventListeners(config, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        showErrorMessage(config, formElement, inputElement);
        toggleButton(config, inputList, buttonElement);
      });
    });
}


 * Объявление функции: обработать событие валидации формы
 * @param {SubmitEvent} event
 * @param {HTMLFormform} forms

 function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (event) => {
          event.preventDefault();
      });

    setEventListeners(config, formElement);
    });
}

//Включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_invalid',
  errorClass: 'popup__error_visible'
});
*/

export class FormValidator {
_container;
_onSubmit;

  constructor(selector, onSubmit) {
    this._container = document.querySelector(selector);
    this._onSubmit = onSubmit;
  }

  _handleSublmit(event) {
    event.preventDefault();

    const input = this._container.querySelector('.popup__form')
    this._onSubmit(input.value);
    input.value = '';
  }

  enableValidation() {
    this._container.addEventListener('submit', (event) => {
      this._handleSublmit(event);
    });
  }
}
