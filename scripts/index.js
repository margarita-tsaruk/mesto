let editProfile = document.querySelector('.profile__edit-button');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = modalWindow.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function openEditForm() {
  modalWindow.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeEditForm() {
  modalWindow.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditForm();
}

editProfile.addEventListener('click', openEditForm);
modalCloseBtn.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', formSubmitHandler);
