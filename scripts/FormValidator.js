export class FormValidator {
  constructor(config, form) {
   this._config = config;
   this._form = form;
   this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
   this._buttonElement = form.querySelector(config.submitButtonSelector);
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

  //Объявление приватного метода: создать показ сообщения об ошибке в полях ввода
  _showInputError(config, form, inputElement, errorMessage) {
    console.log(form);
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  //Объявление публичного метода: скрыть сообщения об ошибке в полях ввода
  hideInputError(config, form, inputElement) {
    console.log(form);
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }

  //Объявление приватного метода: показать/скрыть сообщение об ошибке в случае невалидности полей формы
  _showErrorMessage(config, form, inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(config, form, inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(config, form, inputElement);
    }
  }

  //Объявление публичного метода: активируем метод hideInputError
  handleHideError() {
    this._inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
  }

  //Объявление приватного метода: добавить слушателя событий всем полям ввода внутри формы
  _setEventListeners(config, form) {
    this._inputList.forEach((inputElement) => {
      this.hideInputError(config, form, inputElement);
      inputElement.addEventListener('input', () => {
        this._showErrorMessage(config, form, inputElement);
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

  //Объявление публичного метода: обработать событие валидации формы
  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setEventListeners(this._config, this._form);
  }
}
