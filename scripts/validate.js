const showInputError = (inputElement, errorElement, settings) => {
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, errorElement, settings){
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent ="";
}

const isValid = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, settings);
  } else {
    hideInputError(inputElement, errorElement, settings);
  }
};

const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, settings) =>{
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
  else{
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, settings) => {
  const inputLIst = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputLIst, buttonElement, settings);

  inputLIst.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputLIst, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
