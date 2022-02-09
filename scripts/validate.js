export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const getErrorElement = (formElement, inputElement) => {
  return formElement.querySelector(`#${inputElement.id}-error`);
};

const getInputList = (formElement, { inputSelector }) => {
  return Array.from(formElement.querySelectorAll(inputSelector));
};

const getSubmitButton = (formElement, { submitButtonSelector }) => {
  return formElement.querySelector(submitButtonSelector);
};

const showInputError = (
  inputElement,
  errorElement,
  { inputErrorClass, errorClass }
) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (
  inputElement,
  errorElement,
  { inputErrorClass, errorClass }
) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const clearInputErrors = (formElement, settings) => {
  getInputList(formElement, settings).forEach((inputElement) => {
    hideInputError(
      inputElement,
      getErrorElement(formElement, inputElement),
      settings
    );
  });
};

const disableButtonSubmit = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

const enableButtonSubmit = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

const hasInvalidInput = (inputList) => {
  inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    disableButtonSubmit(buttonElement, settings);
  } else {
    enableButtonSubmit(buttonElement, settings);
  }
};

export const resetInputValidation = (formElement, settings) => {
  clearInputErrors(formElement, settings);
  disableButtonSubmit(getSubmitButton(formElement, settings), settings);
};

const checkInputValidity = (formElement, inputElement, settings) => {
  const errorElement = getErrorElement(formElement, inputElement);

  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, settings);
  } else {
    hideInputError(inputElement, errorElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputLIst = getInputList(formElement, settings);
  const buttonElement = getSubmitButton(formElement, settings);

  inputLIst.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
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

enableValidation(validationSettings);
