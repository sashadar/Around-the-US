const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile-info__name");
const profileJob = profile.querySelector(".profile-info__job");
const profileEditBtn = profile.querySelector(".profile-info__button-edit");
const profileAddBtn = profile.querySelector(".profile__button-add");

/* const popupElement = document.querySelector(".popup"); */
const imageContainer = document.querySelector(
  ".popup__container_content_image"
);
const editProfileContainer = document.querySelector(
  ".popup__container_content_edit-profile"
);
const addCardContainer = document.querySelector(
  ".popup__container_content_add-card"
);

const popupEditProfile = editProfileContainer.closest(".popup");
const popupImage = imageContainer.closest(".popup");
const popupAddCard = addCardContainer.closest(".popup");

const formEditProfile = editProfileContainer.querySelector(".form");
const formAddCard = addCardContainer.querySelector(".form");

const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#template-element").content;

/* const formsProperties = [
  {
    formHeadingVal: "Edit profile",
    formNameAttr: "form-edit-profile",
    inputFirstNameAttr: "name",
    inputFirstVal: "",
    inputFirstPlacehld: "",
    inputScndNameAttr: "job",
    inputScndVal: "",
    inputScndPlacehld: "",
    buttonSubmitVal: "Save",
    buttonSubmitAriaLbl: "save",
  },
  {
    formHeadingVal: "New place",
    formNameAttr: "form-new-place",
    inputFirstNameAttr: "title",
    inputFirstVal: "",
    inputFirstPlacehld: "Title",
    inputScndNameAttr: "image link",
    inputScndVal: "",
    inputScndPlacehld: "Image link",
    buttonSubmitVal: "Create",
    buttonSubmitAriaLbl: "create",
  },
]; */

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

generateInitialCards(initialCards);

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

  cardImage.addEventListener("error", () => {
    cardImage.src = "https://www.freeiconspng.com/uploads/no-image-icon-4.png";
    cardImage.alt = "no image available";
  });

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

  const popupImg = imageContainer.querySelector(".popup__image");
  const popupImgTitleElement = imageContainer.querySelector(
    ".popup__image-title"
  );

  popupImg.src = imgElementSrc.src;
  popupImg.alt = imgElementSrc.alt;
  popupImgTitleElement.textContent = cardTitleElement.textContent;

  enablePopupButtonClose(popupImage);

  popupOpen(popupImage);
}

function popupOpen(popupElement) {
  popupElement.classList.add("popup_opened");
}

function enablePopupButtonClose(popupElement) {
  const popupButtonClose = popupElement.querySelector(".popup__button-close");
  popupButtonClose.addEventListener("click", handlePopupClose);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formEditProfile.querySelector(
    ".form__input_type_name"
  ).value;
  profileJob.textContent = formEditProfile.querySelector(
    ".form__input_type_job"
  ).value;

  popupClose(evt.target.closest(".popup"));
}

function handlePopupClose(evt) {
  popupClose(evt.target.closest(".popup"));
}

function popupClose(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function handleEditProfileOpen() {
  const inputName = editProfileContainer.querySelector(
    ".form__input_type_name"
  );
  const inputJob = editProfileContainer.querySelector(".form__input_type_job");

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  enablePopupButtonClose(popupEditProfile);
  popupOpen(popupEditProfile);
}

function handleAddCardFormOpen() {
  formAddCard.reset();
  enablePopupButtonClose(popupAddCard);
  popupOpen(popupAddCard);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: evt.target.querySelector(".form__input_type_title").value,
    link: evt.target.querySelector(".form__input_type_link").value,
  };

  if (newCard.name === "") {
    newCard.name = "Untitled image";
  }

  generateCard(newCard);

  popupClose(evt.target.closest(".popup"));
}

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
profileEditBtn.addEventListener("click", handleEditProfileOpen);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
profileAddBtn.addEventListener("click", handleAddCardFormOpen);
