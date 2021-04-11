import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._popupForm = document
      .querySelector(popupSelector)
      .querySelector(".form");
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.setEventListeners();
    this._formButton = this._popupForm.querySelector(".form__submit-button");
    this._formButtonText = this._formButton.textContent;
  }

  form() {
    return this._popupForm;
  }

  _getInputValues(form) {
    return Array.from(form.querySelectorAll(".form__input")).reduce(
      (result, current) => ({
        ...result,
        [current.name]: current.value,
      }),
      {}
    );
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues(this._popupForm);
    this._submit(inputValues);
    this.close();
  }

  toggleButtonState() {
    if (this._formButtonText === this._formButton.textContent) {
      this._formButton.textContent = "Сохранение...";
    } else this._formButton.textContent = this._formButtonText;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
