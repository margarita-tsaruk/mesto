

import {
  config,
  containerSelector,
  formProfile,
  formPlace,
  formAvatar,
  popupEditProfileBtn,
  popupAddPlaceBtn,
  popupChangeAvatarBtn,
  nameInput,
  jobInput,

 } from './utils/constants.js'

import Card from './components/Card.js';
import Api from './components/Api.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithConfirmation from './components/PopupWithConfirmation.js';
import FormValidator from './components/FormValidator.js';

//Экземпляр класса, который отвечает за запросы/ответы к серверу
const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-43')

//Экземпляр класса, который отвечает за отрисовку элементов на странице
const cardList = new Section (
  {renderer: (item) => {
    cardList.addItem(getCard(item));
  }},
  containerSelector
);

//Экземпляр класса, который отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  personalInfoSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});


//Статический метод: отрисовать данные карточки и загрузить данные пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    userInfo.downloadUserInfo(res[0]);
    cardList.renderItems(res[1]);
  })
  .catch((err) => {
      console.log(err);
  });

//Объявление функции: создание карточки (новое место)
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

      handleLikeCard: (cardElement) => {
        const likeElement = document.querySelector('.card__like-button');
        const likesQuantity = document.querySelector('.card__like-quantity');

        if(!likeElement.classList.contains('card__like-button_active')) {
          api.setLikeCard(cardElement.id)
          .then((res) => {
            console.log(res)
            card.setLikesAmount(res, likesQuantity)
            console.log(likesQuantity)
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          api.removeCardLike(cardElement.id)
          .then((res) => {
            card.removeLikesAmount(res, likesQuantity)
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

//Экземпляр класса, который отвечает за модальное окно "Редактировать профиль"
const popupEditProfile = new PopupWithForm (
  '.popup_edit_profile', {
    //Отправить форму  модального окна "Редактировать профиль"
    handleFormSubmit: (value) => {
      popupEditProfile.saveLoading(true);
      api.editUserInfo(value['user-name'], value['user-job'])
        .then((res)=> {
           userInfo.setUserInfo(res.name, res.about);
           popupEditProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => popupEditProfile.saveLoading(false))
    }
  }
)

popupEditProfile.setEventListeners();

//Экземпляр класса, который отвечает за модальное окно "Новое место"
const popupAddPlace = new PopupWithForm (
  '.popup_add_place',
    //Отправить форму  модального окна "Новое место"
    { handleFormSubmit: (data) => {
      popupAddPlace.saveLoading(true);
      const cardData = {
        name: data ['place-name'],
        link: data['place-link']
      };

      api.addCard(cardData)
        .then((card) => {
          cardList.addItemToStart(getCard(card));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => popupAddPlace.saveLoading(false))
        }
    },
);

popupAddPlace.setEventListeners();

//Экземпляр класса, который отвечает за модальное окно "Редактировать аватар"
const popupChangeAvatar = new PopupWithForm (
  '.popup_change_avatar', {
    //Отправить форму  модального окна "Редактировать аватар"
    handleFormSubmit: (inputValue) => {
      popupChangeAvatar.saveLoading(true);
      api.changeAvatar(inputValue.link)
        .then((res) => {
          popupChangeAvatar.close();
          userInfo.setUserAvatar(res);

        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => popupChangeAvatar.saveLoading(false))
    }
  }
)

popupChangeAvatar.setEventListeners();

//Экземпляр класса, который отвечает за модальное окно с изображением
const popupImage = new PopupWithImage('.popup_open_image');
popupImage.setEventListeners();

//Экземпляр класса, который отвечает за модальное окно с подтверждением об удалении карточки
const popupConfirmation = new PopupWithConfirmation ('.popup_with_confirmation')
popupConfirmation.setEventListeners();

//Экземпляр класса, который отвечает за запуск валидации формы "Редактировать профиль"
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Экземпляр класса, который отвечает за запуск валидации формы "Новое место"
const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

//Экземпляр класса, который отвечает за запуск валидации формы "Обновить аватар"
const formAvatarValidator = new FormValidator(config, formAvatar);
formAvatarValidator.enableValidation();

//Обработчик события: открыть модальное окно - "Редактировать профиль"
popupEditProfileBtn.addEventListener('click', () => {
  const userData = userInfo.returnUserInfo();

  nameInput.value = userData.userName;
  jobInput.value = userData.userPersonalInfo;

  formProfileValidator.handleHideError();
  formProfileValidator.toggleButton();
  popupEditProfile.open();
});

//Обработчик события: открыть модальное окно - "Добавить новую карточку"
popupAddPlaceBtn.addEventListener('click', () => {
  formPlace.reset();
  formPlaceValidator.handleHideError();
  formPlaceValidator.toggleButton();
  popupAddPlace.open();
});

//Обработчик события: открыть модальное окно - "Обновить аватар"
popupChangeAvatarBtn.addEventListener('click', () => {
  formAvatar.reset();
  formAvatarValidator.handleHideError();
  formAvatarValidator.toggleButton();
  popupChangeAvatar.open();
});





