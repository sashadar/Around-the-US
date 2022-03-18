import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._element.querySelector(".popup__image");
    this._imageTitle = this._element.querySelector(".popup__image-title");
  }

  open(title, link) {
    this._image.src = link;
    this._imageTitle.textContent = title;
    super.open();
  }
}

export default PopupWithImage;
