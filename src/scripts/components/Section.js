export default class Section {
  constructor ( {renderer}, containerSelector) {
  this._renderer = renderer;
  this._container = document.querySelector(containerSelector);
  }

  //Объявление публичного метода: принять DOM-элемент и добавить его в конец контейнера
  addItem(element) {
    this._container.append(element);
  }

  //Объявление публичного метода: принять DOM-элемент и добавить его в начало контейнера
  addItemToStart(element) {
    this._container.prepend(element);
  }

  //Объявление публичного метода: перебрать массив данных
  renderItems(cards) {
    cards.forEach((card) => {
      this._renderer(card);
    });
  }
}
