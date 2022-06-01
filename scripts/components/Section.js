export default class Section {
  constructor ({ data, renderer }, containerSelector) {
  this._renderedItems = data;
  this._renderer = renderer;
  this._container = document.querySelector(containerSelector);
  }

  //Объявление публичного метода: принять DOM-элемент и добавить его в контейнер
  addItem(element) {
    if(this._renderedItems.length > 1) {
      this._container.append(element);
    } else {
    this._container.prepend(element);
    }
  }

  //Объявление публичного метода: перебрать массив данных _renderedItems и вызвать addItem
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item, '.template-card');
    });
  }
}
