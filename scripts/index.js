import { validationSettings, disableButtonSubmit } from "./validate.js";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile-info__name");
const profileJob = profile.querySelector(".profile-info__job");
const profileEditBtn = profile.querySelector(".profile-info__button-edit");
const profileAddBtn = profile.querySelector(".profile__button-add");

const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#template-element").content;

const imageContainer = document.querySelector(
  ".popup__container_content_image"
);
const popupImage = imageContainer.closest(".popup");
const popupImg = imageContainer.querySelector(".popup__image");
const popupImgTitleElement = imageContainer.querySelector(
  ".popup__image-title"
);

const editProfileContainer = document.querySelector(
  ".popup__container_content_edit-profile"
);
const popupEditProfile = editProfileContainer.closest(".popup");
const formEditProfile = editProfileContainer.querySelector(".form");
const formEditProfileInputName = formEditProfile.querySelector(
  ".form__input_type_name"
);
const formEditProfileInputJob = formEditProfile.querySelector(
  ".form__input_type_job"
);

const addCardContainer = document.querySelector(
  ".popup__container_content_add-card"
);
const popupAddCard = addCardContainer.closest(".popup");
const formAddCard = addCardContainer.querySelector(".form");

const popupCloseButtons = document.querySelectorAll(".popup__button-close");
const popupOverlays = document.querySelectorAll(".popup");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

function handleKeyPress(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function generateInitialCards(cardDataArray) {
  for (let index = 0; index < cardDataArray.length; index++) {
    generateCard(cardDataArray[index]);
  }
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__title");
  const cardButtonLike = cardElement.querySelector(
    ".element__button_action_like"
  );
  const cardButtonDelete = cardElement.querySelector(
    ".element__button_action_delete"
  );

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardImage.addEventListener("click", handlePictureOpen);
  cardButtonLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__button_action_like_active");
  });
  cardButtonDelete.addEventListener("click", function (evt) {
    const cardElement = cardButtonDelete.closest(".element");
    cardElement.remove();
  });

  return cardElement;
}

function generateCard(cardData) {
  const placeCard = createCard(cardData);
  cardContainer.prepend(placeCard);
}

function handlePictureOpen(evt) {
  const cardElement = evt.target.parentElement;
  const imgElementSrc = evt.target;
  const cardTitleElement = cardElement.querySelector(".element__title");

  popupImg.src = imgElementSrc.src;
  popupImg.alt = imgElementSrc.alt;
  popupImgTitleElement.textContent = cardTitleElement.textContent;

  openPopup(popupImage);
}

function handleEditProfileOpen() {
  formEditProfileInputName.value = profileName.textContent;
  formEditProfileInputJob.value = profileJob.textContent;

  openPopup(popupEditProfile);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formEditProfileInputName.value;
  profileJob.textContent = formEditProfileInputJob.value;

  handlePopupClose(evt);
}

function handleAddCardFormOpen() {
  formAddCard.reset();
  openPopup(popupAddCard);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: evt.target.querySelector(".form__input_type_title").value,
    link: evt.target.querySelector(".form__input_type_link").value,
  };

  generateCard(newCard);
  handlePopupClose(evt);
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleKeyPress);
}

function handlePopupClose(evt) {
  closePopup(evt.target.closest(".popup"));
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleKeyPress);
}

generateInitialCards(initialCards);

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
profileEditBtn.addEventListener("click", handleEditProfileOpen);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
profileAddBtn.addEventListener("click", handleAddCardFormOpen);
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", handlePopupClose);
});
popupOverlays.forEach((overlay) => {
  overlay.addEventListener("click", handleOverlayClick);
});
