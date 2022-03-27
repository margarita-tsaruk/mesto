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