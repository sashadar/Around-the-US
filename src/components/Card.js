class Card {
  constructor(
    {
      name,
      link,
      id,
      likes,
      ownerId,
      templateSelector,
      handleCardClick,
      handleDeleteCard,
      handleLikeClick,
    },
    userId
  ) {
    this._imageTitle = name;
    this._imageUrl = link;
    this._id = id;
    this._likes = likes;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
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
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this.elementButtonLike = this._element.querySelector(
      ".element__button_action_like"
    );
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._imageTitle, this._imageUrl);
    });
    this._elementButtonDelete.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });
    this.elementButtonLike.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });
  }

  _hideDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._elementButtonDelete.classList.add("element__button_inactive");
    }
  }

  updateLikesCount(count) {
    this._likeCounter.textContent = count;
  }

  checkIfLiked() {
    if (this._likes.some((entry) => entry._id === this._userId)) {
      this.elementButtonLike.classList.add(
        "element__button_action_like_active"
      );
    }
  }

  setLikeIconActive() {
    this.elementButtonLike.classList.add("element__button_action_like_active");
  }

  setLikeIconInactive() {
    this.elementButtonLike.classList.remove(
      "element__button_action_like_active"
    );
  }

  updatelikes(likes) {
    this._likes = likes;
  }

  generateCard() {
    this._getTemplate();
    this._defineElementVariables();
    this._hideDeleteButton();
    this._setEventListeners();
    this.checkIfLiked();
    this._elementImage.src = this._imageUrl;
    this._elementTitle.textContent = this._elementImage.alt = this._imageTitle;
    this.updateLikesCount(this._likes.length);
    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
