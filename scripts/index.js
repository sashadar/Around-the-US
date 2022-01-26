const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile-info__name");
const profileJob = profile.querySelector(".profile-info__job");
const profileEditBtn = profile.querySelector(".profile-info__button-edit");
const profileAddBtn = profile.querySelector(".profile__button-add");

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
const formEditProfileInputName = formEditProfile.querySelector(
  ".form__input_type_name"
);
const formEditProfileInputJob = formEditProfile.querySelector(
  ".form__input_type_job"
);
const formAddCard = addCardContainer.querySelector(".form");

const popupImg = imageContainer.querySelector(".popup__image");
const popupImgTitleElement = imageContainer.querySelector(
  ".popup__image-title"
);

const popupCloseButtons = document.querySelectorAll(".popup__button-close");

const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#template-element").content;

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

  popupImg.src = imgElementSrc.src;
  popupImg.alt = imgElementSrc.alt;
  popupImgTitleElement.textContent = cardTitleElement.textContent;

  openPopup(popupImage);
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formEditProfileInputName.value;
  profileJob.textContent = formEditProfileInputJob.value;

  handlePopupClose(evt);
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

  openPopup(popupEditProfile);
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
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", handlePopupClose);
});
