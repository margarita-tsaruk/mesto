export class FormValidator {
  constructor(config, form) {
   this._config = config;
   this._form = form;
   this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
   this._buttonElement = form.querySelector(config.submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._form, inputElement, this._config);

      inputElement.addEventListener('input', () => {
        this._showErrorMessage(this._config, this._form, inputElement);
        this.toggleButton(this._config, this._inputList, this._buttonElement);
      });
    });
  }

  //Объявление публичного метода: включить и отключить состояние активности кнопки при проверки валидности полей формы
  toggleButton(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._buttonElement.classList.add('popup__button_disabled');
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove('popup__button_disabled');
      this._buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  //Объявление метода: проверить невалидность полей ввода (применить функцию если хотя бы 1 поле невалидно)
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }

  //Объявление метода: показать/скрыть сообщение об ошибке в случае невалидности полей формы
  _showErrorMessage(config, formElement, inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      this._hideInputError(formElement, inputElement, config);
    }
  }

//Объявление метода: создать показ сообщения об ошибке в полях ввода
  _showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

  //Объявление метода: создать скрытие сообщения об ошибке в полях ввода
  _hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
}


