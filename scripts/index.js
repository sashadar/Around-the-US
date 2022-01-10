let formElement = document.querySelector(".form-edit-profile");
let nameInput = formElement.querySelector(".form-edit-profile__name");
let jobInput = formElement.querySelector(".form-edit-profile__job");

let profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile-info__name");
let profileJob = profile.querySelector(".profile-info__job");
let profileEditBtn = profile.querySelector(".profile-info__button-edit");

let popup = document.querySelector(".popup");
let popupCloseBtn = popup.querySelector(".popup__button-close");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove("popup_opened");
}

function handleProfileFormOpen(evt) {
  evt.preventDefault();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popup.classList.add("popup_opened");
}

function handleProfileFormClose(evt) {
  evt.preventDefault();

  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
profileEditBtn.addEventListener("click", handleProfileFormOpen);
popupCloseBtn.addEventListener("click", handleProfileFormClose);
