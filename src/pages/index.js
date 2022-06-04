import '../pages/index.css'

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

 } from '../scripts/utils/constants.js'

import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';

//Объявление общей функции: создание карточки (новое место)
function getCard(item) {
    const card = new Card(item, '.template-card', { handleCardClick: (data) => {
      popupImage.open(data);
    }
  })

  const cardElement = card.generateCard();

  return cardElement;
}

//Экземпляр класса, который отвечает за отрисовку элементов на странице
const cardList = new Section ({
  data: cards,
  renderer: (item) => {
    cardList.addItem(getCard(item));
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

popupEditProfile.setEventListeners();

//Экземпляр класса, который отвечает за модальное окно "Новое место"
const popupAddPlace = new PopupWithForm (
  '.popup_add_place',
    //Отправить форму  модального окна "Новое место"
    { handleFormSubmit: (data) => {

    const cardData = {
      title: data ['place-name'],
      link: data['place-link']
    };

    const cardElement = getCard(cardData);

    cardList.addItemToStart(cardElement);

    }
});

popupAddPlace.setEventListeners();

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
});

//Обработчик события: открыть модальное окно - "Новое место"
popupAddPlaceBtn.addEventListener('click', () => {
  formPlace.reset();
  formPlaceValidator.handleHideError();
  formPlaceValidator.toggleButton();
  popupAddPlace.open();
  //popupAddPlace.setEventListeners();
});