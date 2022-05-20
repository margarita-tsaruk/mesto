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

  //Объявление публичного метода: скрыть сообщения об ошибке в полях ввода
  hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  //Объявление публичного метода: активируем метод hideInputError
  handleHideError () {
    this._inputList.forEach((inputElement) => {
       this.hideInputError(inputElement);
     });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      this.hideInputError(inputElement, this._form, this._config);

      inputElement.addEventListener('input', () => {
        this._showErrorMessage(this._config, this._form, inputElement);
        this.toggleButton(this._config, this._inputList, this._buttonElement);
      });
    });
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
      this.hideInputError(formElement, inputElement, config);
    }
  }

//Объявление метода: создать показ сообщения об ошибке в полях ввода
  _showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
}


/**  //Объявление публичного метода: скрытие ошибок в полях ввода
  hideErrors(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  someMethod() {
    this._inputList.forEach((inputElement) => {
       this.hideErrors(inputElement);
     });
  } */
