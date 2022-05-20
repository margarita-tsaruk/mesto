//Модальные окна
const popups = document.querySelectorAll('.popup');
const popupCloseBtns  = document.querySelectorAll('.popup__close-button');

//Объявление функции: открыть все модальные окна (общая функция)
function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closePopupviaEsc);
}

//Объявление функции: закрыть все модальные окна (общая функция)
function closePopup(popup) {
    popup.classList.toggle('popup_visible');
    document.removeEventListener('keydown', closePopupviaEsc);
}

//Событие: закрыть модальные окна, нажав на кнопку закрытия (крестик)
popupCloseBtns.forEach((elem) => {
    elem.addEventListener('click', () =>
    closePopup(elem.closest('.popup')));
});

//Событие: закрыть модальные окна, нажав на overlay
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
  }});
});

//Объявление функции: закрыть все модальные окна, нажав на клавишу Escape
function closePopupviaEsc(evt) {
    if (evt.key === 'Escape') {
      const popupVisible = document.querySelector('.popup_visible');
      closePopup(popupVisible);
  }
}

export { openPopup, closePopup };
