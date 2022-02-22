import { openPopup } from "./index.js";

const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupPreview = popupImage.closest(".popup");

class Card {
  /*
  _element;
  _imageTitle;
  _imageUrl;
  _templateSelector;
  */

  constructor(data, templateSelector) {
    this._imageTitle = data.name;
    this._imageUrl = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  /* call _getTemplate() before using this function */
  _defineElementVariables() {
    this._elementImage = this._element.querySelector(".element__image");
    this._elementButtonDelete = this._element.querySelector(
      ".element__button_action_delete"
    );
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementButtonLike = this._element.queryselector(
      ".element__button_action_like"
    );
  }

  /* call _defineElementVariables() before using this function */
  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleImagePreview();
    });
    this._elementButtonDelete.addEventListener("click", () => {
      this._handleRemoveElement;
    });
    this._elementButtonLike.addEventListener("click", () => {
      this._handleButtonLikePress();
    });
  }

  generateCard() {
    this._getTemplate();
    this._defineElementVariables();
    this._setEventListeners();
    this._elementImage.src = this._imageTitle;
    this._elementTitle = this._elementImage.alt = this._imageTitle;

    return this._element;
  }

  /*Event Listeners*/

  _handleImagePreview() {
    popupImage.src = this._imageUrl;
    popupImageTitle.textContent = popupImage.alt = this._imageTitle;
    openPopup(popupPreview);
  }

  _handleRemoveElement() {
    this._element.remove();
  }

  _handleButtonLikePress() {
    this._elementButtonLike.classList.toggle(
      "element__button_action_like_active"
    );
  }
}

export default Card;
