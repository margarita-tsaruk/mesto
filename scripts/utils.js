
//Событие: закрыть модальные окна, нажав на overlay
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
  }});
});



