

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

const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-43')

//Экземпляр класса, который отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  personalInfoSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});

api.getUserInfo()
 .then((res) => {
    userInfo.downloadUserInfo(res)
 })

 api.getInitialCards()
 .then((cards) => {
   cardList.renderItems(cards);
 })
 .catch((err) => {
   console.log(err);
 });

//Экземпляр класса, который отвечает за модальное окно "Редактировать профиль"
const popupEditProfile = new PopupWithForm (
  '.popup_edit_profile', {
    //Отправить форму  модального окна "Редактировать профиль"
    handleFormSubmit: (value) => {
      api.editUserInfo(value['user-name'], value['user-job'])
        .then((res)=> {
           userInfo.setUserInfo(res.name, res.about);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
)

popupEditProfile.setEventListeners();

const cardList = new Section (
  {renderer: (item) => {
    cardList.addItem(getCard(item));
  }},
  containerSelector
);

const popupConfirmation = new PopupWithConfirmation (
  '.popup_with_confirmation',
)

//Объявление общей функции: создание карточки (новое место)
function getCard(item) {
  const card = new Card(
    item, {
      handleCardClick: (data) => {
        popupImage.open(data);
      },

      handleDeleteCard: () => {
        popupConfirmation.open();
        popupConfirmation.setSubmitAction((event) => {
          event.preventDefault();
          api.deleteCard(card.getId())
            .then(() => {
                card.removeCard();
                popupConfirmation.close()
            })
            .catch((err) => {
              console.log(err);
            });
          })
      },

      handleLikeCard: (card) => {
        const likeElement = document.querySelector('.card__like-button');
        const likesQuantity = document.querySelector('.card__like-quantity');

        if(!likeElement.classList.contains('card__like-button_active')) {
          api.setLikeCard(card.getId())
          .then((res) => {
            likesQuantity.textContent = res.likes.length;
            likeElement.classList.add('card__like-button_active')
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          api.removeCardLike(card.getId())
          .then((res) => {
            likesQuantity.textContent = res.likes.length;
            likeElement.classList.remove('card__like-button_active')
          })
          .catch((err) => {
            console.log(err);
          });
        }
      }
    },
    '.template-card',
    '0f91438dbdaa0555f50a9a2d'
  )

  const cardElement = card.generateCard();

  return cardElement;
}
popupConfirmation.setEventListeners();

function addCardHandler(cardData) {
  api.addCard(cardData)
    .then((card) => {
      cardList.addItemToStart(getCard(card));
    })
    .catch((err) => {
      console.log(err);
    });
}

//Экземпляр класса, который отвечает за модальное окно "Новое место"
const popupAddPlace = new PopupWithForm (
  '.popup_add_place',
    //Отправить форму  модального окна "Новое место"
    { handleFormSubmit: (data) => {
      const cardData = {
        name: data ['place-name'],
        link: data['place-link']
      };
      addCardHandler(cardData)
      },
    },
);

popupAddPlace.setEventListeners();





// Promise.all([api.getInitialCards(), api.getUserInfo()])
//   .then(([cardList, userInfo]) => {
//       const userData = userInfo.getUserInfo();
//       nameInput.value = userData.userName;
//       jobInput.value = userData.userPersonalInfo;

//       userInfo.setUserInfo(value['user-name'], value['user-job'])
//       cardList.renderItems();

//   })
//   .catch((err) => {
//       console.log(err);
//   });

//Экземпляр класса, который отвечает за модальное окно с изображением
const popupImage = new PopupWithImage('.popup_open_image');
popupImage.setEventListeners();


//Экземпляр класса, который отвечает за модальное окно "Редактировать профиль"
const popupChangeAvatar = new PopupWithForm (
  '.popup_change_avatar', {
    //Отправить форму  модального окна "Редактировать профиль"
    handleFormSubmit: (formData) => {
        api.changeAvatar(formData['avatar-link'])
        .then((res) => {
          userInfo.changeAvatar(res.avatar);
          popupChangeAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        });

        popupChangeAvatar.close();
    }
  }
)
popupChangeAvatar.setEventListeners();



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
});







