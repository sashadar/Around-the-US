import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._element.querySelector(".popup__image");
    this._imageTitle = this._element.querySelector(".popup__image-title");
  }

  open(title, link) {
    this._imageTitle.textContent = title;
    this._image.alt = title;
    this._image.src = link;

    super.open();
  }
}

export default PopupWithImage;
