import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector, formSubmitHandler);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._element.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));

    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  close() {
    super.close;
    this._form.reset();
  }
}

export default PopupWithForm;
