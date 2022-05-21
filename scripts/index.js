import { Card } from './Card.js';
import { cards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup} from './utils.js'

//Объект настроек всех нужных функций
const config = {
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
const popupEditProfileBtn = document.querySelector('.profile__edit-button');
const popupAddPlaceBtn = document.querySelector('.profile__add-button');

//Форма "Редактировать профиль"
const formProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

//Форма "Новое место"
const formPlace = popupAddPlace.querySelector('.popup__form');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

//Данные модального окна "Редактировать профиль"
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Данные модального окна "Открыть изображение"
const popupOpenImage = document.querySelector('.popup_open_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

//Темплейт карточки
const template = document.querySelector('.template-card');

//Данные карточки
const cardImage = document.querySelector('.card__image');


//Контейнер для карточек
const cardsContainer = document.querySelector('.cards__container');

//Запуск валидации формы "Редактировать профиль"
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Запуск валидации формы "Новое место"
const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

//Объявление функции: создание и добавление карточки (новое место) через <tempalte></template>
function getCard() {
    cards.forEach((item) => {
      const card = new Card(item, template, handleOpenPopupImage)
      const cardElement = card.generateCard();

      cardsContainer.append(cardElement);
    });
}

getCard();

//Объявление функции: открыть модальное окно с изображением
function handleOpenPopupImage(title, link) {
  popupImage.src = link;
  popupImage.alt = title;
  popupImageCaption.textContent = title;
  openPopup(popupOpenImage);
}

//Объявление функции: очистить ошибки в полях ввода
function handleResetErrors() {
    const errors = Array.from(document.querySelectorAll('.popup__error'));
    const inputList = Array.from(document.querySelectorAll(config.inputSelector));

    errors.forEach((error) => {
      error.textContent = '';
    });

    inputList.forEach((inputElement) => {
      inputElement.classList.remove('popup__error_visible');
    });
}

//Событие: открыть модальное окно - "Редактировать профиль"
popupEditProfileBtn.addEventListener('click', () => {
    handleResetErrors();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formProfileValidator.handleHideError();
    formProfileValidator.toggleButton();
    openPopup(popupEditProfile);
});

//Событие: открыть модальное окно - "Новое место"
popupAddPlaceBtn.addEventListener('click', () => {
    handleResetErrors();
    formPlace.reset();
    formPlaceValidator.handleHideError();
    formPlaceValidator.toggleButton();
    openPopup(popupAddPlace);
});

//Событие: отправить форму  модального окна "Редактировать профиль"
formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
});

//Событие: отправить форму  модального окна "Новое место"
formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const element = new Card({title: titleInput.value, link: linkInput.value}, template, handleOpenPopupImage).generateCard();
    cardsContainer.prepend(element);
    closePopup(popupAddPlace);
    titleInput.value = '';
    linkInput.value = '';
});
