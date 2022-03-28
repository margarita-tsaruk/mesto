const editProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close-button');

function openEditForm(){
    modalWindow.classList.add('popup_opened');
}
editProfile.addEventListener('click', openEditForm);

modalCloseBtn.addEventListener('click', function () {
    modalWindow.classList.remove('popup_opened');
});


let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.input__text_type_name');
let jobInput = document.querySelector('.input__text_type_job');


function formSubmitHandler (evt) {
  evt.preventDefault();
  let profileName = document.querySelector('.profile__name');
   profileName.textContent = nameInput.value;
   let profileJob = document.querySelector('.profile__job');
   profileJob.textContent = jobInput.value;
   modalWindow.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);



