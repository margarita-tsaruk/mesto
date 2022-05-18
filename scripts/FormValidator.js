
/**

//Объявление функции: проверить невалидность полей ввода (применить функцию если хотя бы 1 поле невалидно)
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
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
  submitButtonSelector: '',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_invalid',
  errorClass: 'popup__error_visible'
});
*/


export class FormValidator {
  constructor(config, form) {
   this._config = config;
   this._form = form;
  }

//Объявление метода: создать показ сообщения об ошибке в полях ввода
  _showInputError(config, form, inputElement, errorMessage) {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  //Объявление метода: создать скрытие сообщения об ошибке в полях ввода
  _hideInputError(config, form, inputElement) {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  }

  //Объявление метода: показать/скрыть сообщение об ошибке в случае невалидности полей формы
  _showErrorMessage(config, form, inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(config, form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(config, form, inputElement);
    }
    this.toggleButton(config, form);
  }

//Объявление функции: включить и отключить состояние активности кнопки при проверки валидности полей формы
  toggleButton(config, form) {
    const buttonElement = form.querySelector(config.submitButtonSelector);
    buttonElement.disabled = !form.checkValidity();
    buttonElement.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
  }

  _setEventListeners(config, form) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._showErrorMessage(config, form, inputElement);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setEventListeners(this._config, this._form);
    this.toggleButton(this._config, this._form);
  }
}


