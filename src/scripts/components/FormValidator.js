export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
    this._buttonElement = form.querySelector(config.submitButtonSelector);
  }

  //Объявление приватного метода: проверить невалидность полей ввода (применить функцию если хотя бы 1 поле невалидно)
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Объявление публичного метода: включить и отключить состояние активности кнопки при проверки валидности полей формы
  toggleButton() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  //Объявление приватного метода: создать показ сообщения об ошибке в полях ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  //Объявление публичного метода: скрыть сообщения об ошибке в полях ввода
  hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  //Объявление приватного метода: показать/скрыть сообщение об ошибке в случае невалидности полей формы
  _showErrorMessage(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
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
      inputElement.addEventListener('input', () => {
        this._showErrorMessage(inputElement);
        this.toggleButton();
      });
    });
  }

  //Объявление публичного метода: обработать событие валидации формы
  enableValidation() {
    this._setEventListeners();
  }
}
