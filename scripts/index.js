let formElement = document.querySelector(".form-edit-profile");
let nameInput = formElement.querySelector(
  ".form-edit-profile__input_type_name"
);
let jobInput = formElement.querySelector(".form-edit-profile__input_type_job");

let profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile-info__name");
let profileJob = profile.querySelector(".profile-info__job");
let profileEditBtn = profile.querySelector(".profile-info__button-edit");

let popup = document.querySelector(".popup");
let popupCloseBtn = popup.querySelector(".popup__button-close");

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

const someCard = {
  name: "Yosemite Valley",
  link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
};

generateInitialCards(initialCards);
generateCard(someCard);

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
  cardContainer.append(placeCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  handleProfileFormClose(evt);
}

function handleProfileFormOpen(evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popup.classList.add("popup_opened");
}

function handleProfileFormClose(evt) {
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
profileEditBtn.addEventListener("click", handleProfileFormOpen);
popupCloseBtn.addEventListener("click", handleProfileFormClose);
