export default class Section {
  constructor ({ data, renderer }, containerSelector) {
  this._renderedItems = data;
  this._renderer = renderer;
  this._container = document.querySelector(containerSelector);
  }

  //Объявление публичного метода: принять DOM-элемент и добить его в контейнер
  addItem(element) {
    this._container.append(element);
  }

  //Объявление публичного метода: перебрать массив данных _renderedItems и вызвать addItem
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }



  //clear() {
  //  this._container.innerHTML = '';
  // }
}
