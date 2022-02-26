class FormValidator {
  /*
   class properties:
    _formElement;
    _settings
    _inputList
    _buttonSubmit
   */

  /*
  settings object template:
    const settings = {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    };
 */

  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._getErrorElement(inputElement);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _clearInputErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement, this._getErrorElement(inputElement));
    });
  }

  _disableButtonSubmit() {
    this._buttonSubmit.classList.add(this._settings.inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  }

  _enableButtonSubmit() {
    this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass);
    this._buttonSubmit.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButtonSubmit();
    } else {
      this._enableButtonSubmit();
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonSubmit = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetInputValidation() {
    this._clearInputErrors();
    this._disableButtonSubmit();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
