export default class Section {
  constructor ({ data, renderer }, containerSelector) {
  this._renderedItems = data;
  this._renderer = renderer;
  this._container = document.querySelector(containerSelector);
  }

  //Объявление публичного метода: принять DOM-элемент и добавить его в контейнер
  addItem(element) {
    this._container.append(element);
  }

  addItemToStart(element) {
    this._container.prepend(element);
  }

  //Объявление публичного метода: перебрать массив данных
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item, '.template-card');
    });
  }
}
