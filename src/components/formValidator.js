export default class FormValidator {
  constructor(values, form) {
    this._values = values;
    this._form = form;
    this._formInputElements = this._form.querySelectorAll(this._values.inputSelector);
  }

  _isInvalid(formElement) {
    return !formElement.validity.valid;
  }

  _showInputError(inputElement, errorMessage) {
    const errorMessageContainer = this._form.querySelector(`.${inputElement.id}-error`);
    errorMessageContainer.classList.add(this._values.errorClass);
    errorMessageContainer.textContent = errorMessage;
    inputElement.classList.add(this._values.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageContainer = this._form.querySelector(`.${inputElement.id}-error`);
    errorMessageContainer.classList.remove(this._values.errorClass);
    errorMessageContainer.textContent = '';
    inputElement.classList.remove(this._values.inputErrorClass);
  }


  _toggleSubmitButton() {
    const submitButton = this._form.querySelector(this._values.submitButtonSelector);
    if (Array.from(this._form.elements).some((element) => this._isInvalid(element))) {
      submitButton.classList.add(this._values.inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    } else {
      submitButton.classList.remove(this._values.inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    Array.from(this._formInputElements).forEach((element) => {
      element.addEventListener('input', () => {
        this._toggleSubmitButton();
        if (this._isInvalid(element)) {
          this._showInputError(element, element.validationMessage);
        } else {
          this._hideInputError(element);
        }
      });
    })
  }

  clearValidation() {
    this._toggleSubmitButton();
    Array.from(this._formInputElements).forEach((element) => {
      this._hideInputError(element);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
