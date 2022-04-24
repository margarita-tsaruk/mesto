

function enableValidation(formSelector) {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((element) => {
     element.addEventListener('submit', (event) => handleFormSubmit(event, element));
     element.addEventListener('input', (event) => handleFormInput(event, element));
  })
}
/**
 * Обработать событие валидации формы
 * @param {SubmitEvent} event
 * @param {HTMLFormElement} element
 */
function handleFormSubmit(event, element) {
  event.preventDefault();

    if (element.checkValidity()) {
    alert('Form is valid');
  } else {
    alert('Not valid');
  }
}

function handleFormInput(event) {
  const input = event.target;
}

enableValidation('.popup__form');
