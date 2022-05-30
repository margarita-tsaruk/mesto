import Section from './Section.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup} from './utils.js'
import { config,
  containerSelector,
  items,
  formProfile,
  formPlace,
  popupEditProfileBtn,
  popupAddPlaceBtn,
  popupAddPlace,
  nameInput

 } from './utils/constants.js'
import { Card } from './Card.js';


const cardList = new Section ({
    data: items,
    renderer: (item) => {
      const card = new Card(item, '.template-card', handleOpenPopupImage);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
 containerSelector
);

//Запуск валидации формы "Редактировать профиль"
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Запуск валидации формы "Новое место"
const formPlaceValidator = new FormValidator(config, formPlace);
formPlaceValidator.enableValidation();

/**Объявление функции: создание карточки (новое место)
function getCard(element, templateSelector) {
  const card = new Card(element, templateSelector, handleOpenPopupImage).generateCard();

    return card;
}

//Объявление функции: добавления карточки (новое место)
function renderCard() {
    cards.forEach((item) => {
    const cardElement = getCard(item, '.template-card', handleOpenPopupImage);

    cardsContainer.append(cardElement);
  });
}

renderCard();

*/

//Объявление функции: открыть модальное окно с изображением
function handleOpenPopupImage(title, link) {
    popupImage.src = link;
    popupImage.alt = title;
    popupImageCaption.textContent = title;
    openPopup(popupOpenImage);
}

//Событие: открыть модальное окно - "Редактировать профиль"
popupEditProfileBtn.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formProfileValidator.handleHideError();
    formProfileValidator.toggleButton();
    openPopup(popupEditProfile);
});

//Событие: открыть модальное окно - "Новое место"
popupAddPlaceBtn.addEventListener('click', () => {
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
    cardsContainer.prepend(getCard({title: titleInput.value, link: linkInput.value}, '.template-card', handleOpenPopupImage));
    closePopup(popupAddPlace);
});
