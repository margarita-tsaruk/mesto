const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddPlace = document.querySelector('.popup_add_place');
const popupOpenImage = document.querySelector('.popup_open_image');

const editProfileBtn = document.querySelector('.profile__edit-button');
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');

const addPlaceBtn = document.querySelector('.profile__add-button');
const popupAddPlaceCloseBtn = popupAddPlace.querySelector('.popup__close-button');
const placeForm = document.querySelector('.popup__container_place_form');

const placeImage = document.querySelector('.popup__image');
const placeCaption= document.querySelector('.popup__caption');
const popupOpenImageCloseBtn = popupOpenImage.querySelector('.popup__close-button');

function openPopup(popup) {
  popup.classList.add('popup_visible');
}

editProfileBtn.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addPlaceBtn.addEventListener('click', () => openPopup(popupAddPlace));

function handleOpenImagePopup(openImage) {
  openPopup(popupOpenImage);
  placeImage.src = openImage.link;
  placeImage.alt = openImage.title;
  placeCaption.textContent = openImage.title;
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
}

popupEditCloseBtn.addEventListener('click', () => closePopup(popupEditProfile));
popupAddPlaceCloseBtn.addEventListener('click', () => closePopup(popupAddPlace));
popupOpenImageCloseBtn.addEventListener('click', () => closePopup(popupOpenImage));

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
});

placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const titleInput = document.querySelector('.popup__text_type_title');
  const linkInput = document.querySelector('.popup__text_type_link');
  const element = getElements({title: titleInput.value, link: linkInput.value});
  elementsContainer.prepend(element);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(popupAddPlace);
});

const elements = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Гора Эльбрус',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Домбай',
    link: 'https://images.unsplash.com/photo-1617911478446-c7f1dd96966e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8JUQwJUI0JUQwJUJFJUQwJUJDJUQwJUIxJUQwJUIwJUQwJUI5fGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    title: 'Осетия',
    link: 'https://images.unsplash.com/photo-1617310188339-0b50f24b29eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUQwJUJFJUQxJTgxJUQwJUI1JUQxJTgyJUQwJUI4JUQxJThGfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    title: 'Джилы-Су',
    link: 'https://images.unsplash.com/photo-1613219281931-34c1ef811769?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fCVEMCVCNCVEMCVCNiVEMCVCOCVEMCVCQiVEMSU4QiUyMCVEMSU4MSVEMSU4M3xlbnwwfHwwfHw%3D&w=1000&q=80'
  },
  {
    title: 'Карачаево-Черкессия',
    link: 'https://images.unsplash.com/photo-1627329904799-607897b1eb60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8JUQwJUJBJUQwJUIwJUQxJTgwJUQwJUIwJUQxJTg3JUQwJUIwJUQwJUI1JUQwJUIyJUQwJUJFJTIwJUQxJTg3JUQwJUI1JUQxJTgwJUQwJUJBJUQwJUI1JUQxJTgxJUQxJTgxJUQwJUI4JUQxJThGfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  }
];

const elementsContainer = document.querySelector('.elements__area');
const template = document.querySelector('.template-element');

function getElements(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const elementPhoto = getElementTemplate.querySelector('.element__photo');
  const elementHeading = getElementTemplate.querySelector('.element__heading');
  const likePlaceBtn = getElementTemplate.querySelector('.element__like-button');
  const removePlacedBtn = getElementTemplate.querySelector('.element__trash-button');

  elementHeading.textContent = item.title;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.title;

  elementPhoto.addEventListener('click', (evt) => {
    const elementTarget = evt.target;
    const item = {
      title: elementTarget.alt,
      link: elementTarget.src
    };

   handleOpenImagePopup(item);
  });

  likePlaceBtn.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like-button_active');
  });

  removePlacedBtn.addEventListener('click', (evt) => {
    const element = evt.target.closest('.element');
    element.remove();
  });

  return getElementTemplate;
}

function render() {
  const html = elements.map(getElements);
  elementsContainer.append(...html);
}

render();

