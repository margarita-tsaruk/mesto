import {
  config,
  containerSelector,
  cards,
  formProfile,
  formPlace,
  popupEditProfileBtn,
  popupAddPlaceBtn,
  nameInput,
  jobInput,

 } from './utils/constants.js'

import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';

//Объявление общей функции: создание карточки (новое место)
function getCard(title, link, templateSelector, handleCardClick ) {
    const card = new Card(title, link, templateSelector, handleCardClick)

    const cardElement = card.generateCard();

  return cardElement;
}

//Экземпляр класса, который отвечает за отрисовку элементов на странице
const cardList = new Section ({
    data: cards,
    renderer: (items) => {
      cardList.addItem(getCard(items, '.template-card', ({title, link}) => {
        popupImage.open(title, link)
      }
      ));
    }
  },
 containerSelector
);

cardList.renderItems();

//Экземпляр класса, который отвечает за модальное окно с изображением
const popupImage = new PopupWithImage('.popup_open_image');
popupImage.setEventListeners();

//Экземпляр класса, который отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  personalInfoSelector: '.profile__job'
});

//Экземпляр класса, который отвечает за модальное окно "Редактировать профиль"
const popupEditProfile = new PopupWithForm (
  '.popup_edit_profile', {
    //Отправить форму  модального окна "Редактировать профиль"
    handleFormSubmit: (value) => {
        userInfo.setUserInfo(value['user-name'], value['user-job'])

        popupEditProfile.close();
    }
  }
)

//Экземпляр класса, который отвечает за модальное окно "Новое место"
const popupAddPlace = new PopupWithForm (
  '.popup_add_place',
    //Отправить форму  модального окна "Новое место"
    { handleFormSubmit: (inputsValue) => {
      //const cardElement = new Card(inputValues, '.template-card', handleOpenPopupImage(title, link)).generateCard();

      cardList.addItem(getCard(inputsValue, '.template-card',
      ({title, link}) => {
        popupImage.open({title, link})
      }

      ));
      }
    },containerSelector );

  cardList.renderItems();

//Экземпляр класса, который отвечает за запуск валидации формы "Редактировать профиль"
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Экземпляр класса, который отвечает за запуск валидации формы "Новое место"
const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

//Обработчик события: открыть модальное окно - "Редактировать профиль"
popupEditProfileBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.userName;
  jobInput.value = userData.userPersonalInfo;
  formProfileValidator.handleHideError();
  formProfileValidator.toggleButton();
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
});

//Обработчик события: открыть модальное окно - "Новое место"
popupAddPlaceBtn.addEventListener('click', () => {
  formPlace.reset();
  formPlaceValidator.handleHideError();
  formPlaceValidator.toggleButton();
  popupAddPlace.open();
  popupAddPlace.setEventListeners();
});
