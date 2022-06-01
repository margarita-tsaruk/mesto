import {
  config,
  containerSelector,
  items,
  formProfile,
  formPlace,
  popupEditProfileBtn,
  popupAddPlaceBtn,
  nameInput,
  jobInput,
  popupImage,
  popupImageCaption,

 } from './utils/constants.js'

import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';

//Объявление функции: создание карточки (новое место)
function getCard(item) {
  const card = new Card(item, '.template-card', handleOpenPopupImage).generateCard();

    return card;
}
//Объявление функции: открыть модальное окно с изображением
function handleOpenPopupImage(title, link) {
  popupImage.src = link;
  popupImage.alt = title;
  popupImageCaption.textContent = title;
  //popupOpen.open(popupOpenImage);
}

const cardList = new Section ({
    data: items,
    renderer: (item) => {
      cardList.addItem(getCard(item));
    }
  },
 containerSelector
);

cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  personalInfoSelector: '.profile__job'
});

const popupEditProfile = new PopupWithForm (
  '.popup_edit_profile', {
    handleFormSubmit: (value) => {
        userInfo.setUserInfo(value['user-name'], value['user-job'])

        popupEditProfile.close();
    }
  }
)

const popupAddPlace = new PopupWithForm (
  '.popup_add_place', {
    handleFormSubmit: (inputValues) => {

    const addCard = new Section ({
      data: [{
        title: inputValues['place-name'],
        link: inputValues['place-link']
      }],
      renderer: (item, selector) => {
        addCard.addItem(getCard(item, selector, handleOpenPopupImage));
      }
    }, containerSelector);

  addCard.renderItems();
  }
  });

//Запуск валидации формы "Редактировать профиль"
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Запуск валидации формы "Новое место"
const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

//Событие: открыть модальное окно - "Редактировать профиль"
popupEditProfileBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.userName;
  jobInput.value = userData.userPersonalInfo;
  formProfileValidator.handleHideError();
  formProfileValidator.toggleButton();
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
});

//Событие: открыть модальное окно - "Новое место"
popupAddPlaceBtn.addEventListener('click', () => {
  formPlace.reset();
  formPlaceValidator.handleHideError();
  formPlaceValidator.toggleButton();
  popupAddPlace.open();
  popupAddPlace.setEventListeners();
});


/**
//Объявление функции: добавления карточки (новое место)
function renderCard() {
    cards.forEach((item) => {
    const cardElement = getCard(item, '.template-card', handleOpenPopupImage);

    cardsContainer.append(cardElement);
  });
}

renderCard();









//Событие: отправить форму  модального окна "Редактировать профиль"
formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    //closePopup(popupEditProfile);
});

//Событие: отправить форму  модального окна "Новое место"
formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //const card = new Card(item, '.template-card', handleOpenPopupImage);
    //const cardElement = card.generateCard();
    //cardList.addItem(cardElement);
    //cardsContainer.prepend(cardElement({title: titleInput.value, link: linkInput.value}, '.template-card', handleOpenPopupImage));
    closePopup(popupAddPlace);
});
*/
