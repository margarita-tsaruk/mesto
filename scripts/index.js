

import {
  config,
  containerSelector,
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
import PopupWithConfirmation from './components/PopupWithConfirmation.js';
import Api from './components/Api.js';

function addCardHandler(cardName, cardLink) {
  api.addCard(cardName, cardLink)
}

function deleteCardHandler(card) {
  api.deleteCard(card.getId())
  .then(() => {
    task.removeCard()
  })
  .catch((err) => {
    console.log(err);
  });
}

//Объявление общей функции: создание карточки (новое место)
function getCard(item) {
    const card = new Card(
    item,
    '.template-card',
    { handleCardClick: (data) => {
      popupImage.open(data);
      }
    },
  deleteCardHandler)

  const cardElement = card.generateCard();

  return cardElement;
}

const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-43')

api.getInitialCards()
  .then((cards) => {
    const cardList = new Section ({
      data: cards,
      renderer: (item) => {
        cardList.addItem(getCard(item));
      }

    },
    containerSelector
    );

    cardList.renderItems();
    })
  .catch((err) => {
    console.log(err);
  });

//Экземпляр класса, который отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    personalInfoSelector: '.profile__job'
  });

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardList, userInfo]) => {
      console.log(userInfo)
      const userData = userInfo.getUserInfo();
      nameInput.value = userData.userName;
      jobInput.value = userData.userPersonalInfo;

      userInfo.setUserInfo(value['user-name'], value['user-job'])
      cardList.renderItems();

  })
  .catch((err) => {
      console.log(err);
  });

//Экземпляр класса, который отвечает за модальное окно с изображением
const popupImage = new PopupWithImage('.popup_open_image');
popupImage.setEventListeners();

//Экземпляр класса, который отвечает за модальное окно "Редактировать профиль"
const popupEditProfile = new PopupWithForm (
  '.popup_edit_profile', {
    //Отправить форму  модального окна "Редактировать профиль"
    handleFormSubmit: (value) => {
        //userInfo.setUserInfo(value['user-name'], value['user-job'])

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
  },
  addCardHandler
);

popupAddPlace.setEventListeners();

//Экземпляр класса, который отвечает за запуск валидации формы "Редактировать профиль"
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Экземпляр класса, который отвечает за запуск валидации формы "Новое место"
const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

//Обработчик события: открыть модальное окно - "Редактировать профиль"
popupEditProfileBtn.addEventListener('click', () => {
  //const userData = userInfo.getUserInfo();

  //nameInput.value = userData.userName;
  //jobInput.value = userData.userPersonalInfo;
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
});







