export class FormValidator {
  constructor(config, form) {
   this._config = config;
   this._form = form;
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    this.toggleButton(inputList, buttonElement, this._config);

    inputList.forEach((inputElement) => {
      this._hideInputError(this._form, inputElement, this._config);

      inputElement.addEventListener('input', () => {
        this.toggleButton(this._config, inputList, buttonElement);
        this._showErrorMessage(this._config, this._form, inputElement);
      });
    });
  }

  //Объявление функции: включить и отключить состояние активности кнопки при проверки валидности полей формы
  toggleButton(config, inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  //Объявление функции: проверить невалидность полей ввода (применить функцию если хотя бы 1 поле невалидно)
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }

  //Объявление метода: показать/скрыть сообщение об ошибке в случае невалидности полей формы
  _showErrorMessage(config, formElement, inputElement) {
    if(!inputElement.validity.valid) {
      showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(config, formElement, inputElement);
    }
  }

//Объявление метода: создать показ сообщения об ошибке в полях ввода
  _showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

  //Объявление метода: создать скрытие сообщения об ошибке в полях ввода
  _hideInputError(config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
}

