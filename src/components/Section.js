export class Section {
  //rendering a list of elements on a page
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // responsible for creating and rendering data on a page.
    this._container = document.querySelector(containerSelector); //CSS class selector to  add the card elements.
  }

  render(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    //public method that takes the items and render them into the container.
    this._container.prepend(item);
  }
}
