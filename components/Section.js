class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  addItem(element) {
    this._section.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
