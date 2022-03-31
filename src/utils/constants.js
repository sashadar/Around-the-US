const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

const userInfoSelectors = {
  nameselector: ".profile-info__name",
  jobSelector: ".profile-info__job",
};

const cardSectionSelector = ".elements";

const popupSelectors = {
  popupEditProfile: ".popup_content_edit-profile",
  popupAddCard: ".popup_content_add-card",
  popupWithImage: ".popup_content_image",
};

const editProfileContainer = document.querySelector(
  ".popup__container_content_edit-profile"
);
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
const formAddCard = addCardContainer.querySelector(".form");

export {
  validationSettings,
  initialCards,
  userInfoSelectors,
  popupSelectors,
  cardSectionSelector,
  formEditProfile,
  formAddCard,
  formEditProfileInputName,
  formEditProfileInputJob,
};
