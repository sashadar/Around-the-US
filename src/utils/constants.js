const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const userInfoSelectors = {
  nameselector: ".profile-info__name",
  jobSelector: ".profile-info__job",
  avatarSelector: ".avatar",
};

const cardSectionSelector = ".elements";

const popupSelectors = {
  popupEditProfile: ".popup_content_edit-profile",
  popupAddCard: ".popup_content_add-card",
  popupWithImage: ".popup_content_image",
  popupEditAvatar: ".popup_content_edit-avatar",
  popupConfirm: ".popup_content_confirmation",
};

const popupFormSaveButtonLabels = {
  submitButtonLabel: "Save",
  submitButtonAltLabel: "Saving...",
};

const popupFormCreateButtonLabels = {
  submitButtonLabel: "Create",
  submitButtonAltLabel: "Creating...",
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

const editAvatarContainer = document.querySelector(
  ".popup_content_edit-avatar"
);
const formEditAvatar = editAvatarContainer.querySelector(".form");
const formEditAvatarInputLink = formEditAvatar.querySelector(
  ".form__input_type_link"
);

const addCardContainer = document.querySelector(
  ".popup__container_content_add-card"
);
const formAddCard = addCardContainer.querySelector(".form");

const apiSettings = {
  serverUrl: "https://around.nomoreparties.co",
  groupId: "group-12",
  token: "652541db-3ac9-4c6c-9895-39ab2ae4c9f3",
};

export {
  validationSettings,
  userInfoSelectors,
  popupSelectors,
  cardSectionSelector,
  formEditProfile,
  formAddCard,
  formEditProfileInputName,
  formEditProfileInputJob,
  formEditAvatar,
  formEditAvatarInputLink,
  apiSettings,
  popupFormSaveButtonLabels,
  popupFormCreateButtonLabels,
};
