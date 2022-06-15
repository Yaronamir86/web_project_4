export class Section { //rendering a list of elements on a page
  constructor({ items, renderer }, containerSelector) {
    this._items = items;  //array of data to add on a page when initializing the class.
    this._renderer = renderer; // responsible for creating and rendering data on a page.
    this._container = document.querySelector(containerSelector); //CSS class selector to  add the card elements.
  }

  render() { // public method that renders each element on a page.
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) { //public method that takes a DOM element and adds it to the container..
    this._container.prepend(item);
  }
}