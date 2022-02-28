const handleKeyPress = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleKeyPress);
};

const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handleKeyPress);
};

export { openPopup, closePopup };
