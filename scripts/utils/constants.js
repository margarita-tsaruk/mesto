//Объект настроек всех нужных функций
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_invalid',
  errorClass: 'popup__error_visible'
};

//Модальные окна - "Редактировать профиль" и "Новое место"
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddPlace = document.querySelector('.popup_add_place');

//Кнопки открытия/закрытия модальных окон
export const popupEditProfileBtn = document.querySelector('.profile__edit-button');
export const popupAddPlaceBtn = document.querySelector('.profile__add-button');

//Форма "Редактировать профиль"
export const formProfile = popupEditProfile.querySelector('.popup__form');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

//Форма "Новое место"
export const formPlace = popupAddPlace.querySelector('.popup__form');

//Контейнер для карточек
export const containerSelector = '.cards__container';

