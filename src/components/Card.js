class Card {
  constructor({ name, link, id, likes, templateSelector, handleCardClick }) {
    this._imageTitle = name;
    this._imageUrl = link;
    this._id = id;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _defineElementVariables() {
    this._elementImage = this._element.querySelector(".element__image");
    this._elementButtonDelete = this._element.querySelector(
      ".element__button_action_delete"
    );
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementButtonLike = this._element.querySelector(
      ".element__button_action_like"
    );
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._imageTitle, this._imageUrl);
    });
    this._elementButtonDelete.addEventListener("click", () => {
      this._handleRemoveElement();
    });
    this._elementButtonLike.addEventListener("click", () => {
      this._handleButtonLikePress();
    });
  }

  generateCard() {
    this._getTemplate();
    this._defineElementVariables();
    this._setEventListeners();
    this._elementImage.src = this._imageUrl;
    this._elementTitle.textContent = this._elementImage.alt = this._imageTitle;

    return this._element;
  }

  _handleRemoveElement() {
    this._element.remove();
    this._element = null;
  }

  _handleButtonLikePress() {
    this._elementButtonLike.classList.toggle(
      "element__button_action_like_active"
    );
  }
}

export default Card;
