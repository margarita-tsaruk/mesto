import { Card } from './Card.js';
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

const inputList = Array.from(document.querySelectorAll(config.inputSelector));


//Модальные окна
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddPlace = document.querySelector('.popup_add_place');

//Кнопки открытия/закрытия модальных окон
const popupEditProfileBtn = document.querySelector('.profile__edit-button');
const popupAddPlaceBtn = document.querySelector('.profile__add-button');

//Форма "Редактрировать профиль"
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

const cardsContainer = document.querySelector('.cards__container');

const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

//Объявление функции: очистить ошибки в полях ввода
function handleResetErrors() {
  const errors = Array.from(document.querySelectorAll('.popup__error'));

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

    formProfileValidator.toggleButton();

    openPopup(popupEditProfile);
});

//Событие: открыть модальное окно - "Новое место"
popupAddPlaceBtn.addEventListener('click', () => {
    handleResetErrors();

    formPlace.reset();

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

  const element = new Card({title: titleInput.value, link: linkInput.value}).generateCard();
  cardsContainer.prepend(element);
  closePopup(popupAddPlace);
  titleInput.value = '';
  linkInput.value = '';
});






/**
//Объявление функции: открыть модальное окно с изображением
function handleOpenImagePopup(openImage) {
    placeImage.src = openImage.link;
    placeImage.alt = openImage.title;
    placeCaption.textContent = openImage.title;

    openPopup(popupOpenImage);
}

//Объявление функции: создание карточки (новое место) через <tempalte></template>
function getCard(item) {
    const cardTemplate = template.content.cloneNode(true);
    const cardImage = cardTemplate.querySelector('.card__image');
    const cardHeading = cardTemplate.querySelector('.card__heading');

    const cardTrashBtn = cardTemplate.querySelector('.card__trash-button');

    cardHeading.textContent = item.title;
    cardImage.src = item.link;
    cardImage.alt = item.title;

    //Событие: открыть модальное окно с изображением
    cardImage.addEventListener('click', () => {
        handleOpenImagePopup(item);
    });

    //Событие: лайкнуть карточку (новое место)
    cardLikeBtn.addEventListener('click', (evt) => {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like-button_active');
    });

    //Событие: удалить карточку (новое место)
   cardTrashBtn.addEventListener('click', (evt) => {
        const cardTarget = evt.target.closest('.card');
        cardTarget.remove();
    });

  return cardTemplate;
}

//Объявление функции: добавить карточку (новое место) в контейнер карточек
function render() {
    const cardsInsert = cards.map(getCard);
    cardsContainer.append(...cardsInsert);
}

render();


popupEditProfileBtn.addEventListener('click', () => {
  const inputList = Array.from(formProfile.querySelectorAll(config.inputSelector));
  const buttonElement = formProfile.querySelector(config.submitButtonSelector);

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    inputList.forEach((inputElement) => {
      hideInputError(config, formProfile, inputElement);
    });

    toggleButton(config, inputList, buttonElement);

    openPopup(popupEditProfile);
});
*/
