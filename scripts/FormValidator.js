export class FormValidator {
  constructor(config, form) {
   this._config = config;
   this._form = form;
   this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
   this._buttonElement = form.querySelector(config.submitButtonSelector);
  }

  //Объявление публичного метода: обработать событие валидации формы
  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }

  //Объявление публичного метода: включить и отключить состояние активности кнопки при проверки валидности полей формы
  toggleButton(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
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
  handleHideError() {
    this._inputList.forEach((inputElement) => {
       this.hideInputError(inputElement);
     });
  }

  //Объявление приватного метода: добавить слушателя событий всем полям ввода внутри формы
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
      inputElement.addEventListener('input', () => {
        this._showErrorMessage(this._config, this._form, inputElement);
        this.toggleButton(this._inputList);
      });
    });
  }

  //Объявление приватного метода: проверить невалидность полей ввода (применить функцию если хотя бы 1 поле невалидно)
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Объявление приватного метода: показать/скрыть сообщение об ошибке в случае невалидности полей формы
  _showErrorMessage(config, formElement, inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      this.hideInputError(inputElement);
    }
  }

  //Объявление приватного метода: создать показ сообщения об ошибке в полях ввода
  _showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
}
