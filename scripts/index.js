const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const popupCloseBtns  = document.querySelectorAll('.popup__close-button');

const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddPlace = document.querySelector('.popup_add_place');
const popupOpenImage = document.querySelector('.popup_open_image');

const popupEditProfileBtn = document.querySelector('.profile__edit-button');
const formProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const popupAddPlaceBtn = document.querySelector('.profile__add-button');
const formPlace = popupAddPlace.querySelector('.popup__form');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

const placeImage = document.querySelector('.popup__image');
const placeCaption= document.querySelector('.popup__caption');

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

function openPopup(popup) {
    popup.classList.add('popup_visible');
}

popupEditProfileBtn.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEditProfile);
});

popupAddPlaceBtn.addEventListener('click', () => openPopup(popupAddPlace));

function handleOpenImagePopup(openImage) {
    placeImage.src = openImage.link;
    placeImage.alt = openImage.title;
    placeCaption.textContent = openImage.title;
    openPopup(popupOpenImage);
}

function closePopup(popup) {
    popup.classList.toggle('popup_visible');
}

popupCloseBtns.forEach((elem) => {
    elem.addEventListener('click', () => closePopup(elem.closest('.popup')))
});

formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
});

formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const element = getElements({title: titleInput.value, link: linkInput.value});
    elementsContainer.prepend(element);
    closePopup(popupAddPlace);
    titleInput.value = '';
    linkInput.value = '';
});

function getElements(item) {
    const elementTemplate = template.content.cloneNode(true);
    const elementPhoto = elementTemplate.querySelector('.element__photo');
    const elementHeading = elementTemplate.querySelector('.element__heading');
    const elementLikeBtn = elementTemplate.querySelector('.element__like-button');
    const elementRemoveBtn = elementTemplate.querySelector('.element__trash-button');

    elementHeading.textContent = item.title;
    elementPhoto.src = item.link;
    elementPhoto.alt = item.title;

    elementPhoto.addEventListener('click', (evt) => {
        handleOpenImagePopup(item);
    });

    elementLikeBtn.addEventListener('click', (evt) => {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('element__like-button_active');
    });

    elementRemoveBtn.addEventListener('click', (evt) => {
        const elementTarget = evt.target.closest('.element');
        elementTarget.remove();
    });

  return elementTemplate;
}

function render() {
    const elementsInsert = elements.map(getElements);
    elementsContainer.append(...elementsInsert);
}

render();

