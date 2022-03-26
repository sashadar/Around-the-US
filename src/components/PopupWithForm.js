import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
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
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
