export class FormValidator {
  constructor(values, form) {
    this._values = values;
    this._form = form;
  }

  _isInvalid(formElement) {
    return !formElement.validity.valid;
  }

  _showInputError(form, inputElement, errorMessage, errorClass, inputErrorClass) {
    const errorMessageContainer = form.querySelector(`.${inputElement.id}-error`);
    errorMessageContainer.classList.add(errorClass);
    errorMessageContainer.textContent = errorMessage;
    inputElement.classList.add(inputErrorClass);
  }

  _hideInputError(form, inputElement, errorClass, inputErrorClass) {
    const errorMessageContainer = form.querySelector(`.${inputElement.id}-error`);
    errorMessageContainer.classList.remove(errorClass);
    errorMessageContainer.textContent = '';
    inputElement.classList.remove(inputErrorClass);
    }


  _toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass) {
    const _submitButton = form.querySelector(submitButtonSelector);
    if (Array.from(form.elements).some((element) => this._isInvalid(element))) {
      _submitButton.classList.add(inactiveButtonClass);
      _submitButton.setAttribute('disabled', true);
    } else {
      _submitButton.classList.remove(inactiveButtonClass);
      _submitButton.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    const formInputElements = this._form.querySelectorAll(this._values.inputSelector);
    //this._toggleSubmitButton(this._form, submitButtonSelector, inactiveButtonClass);
    Array.from(formInputElements).forEach((element) => {
      element.addEventListener('input', () => {
        if (this._isInvalid(element)) {
          this._showInputError(this._form, element, element.validationMessage, this._values.errorClass, this._values.inputErrorClass);
          this._toggleSubmitButton(this._form, this._values.submitButtonSelector, this._values.inactiveButtonClass)
        } else {
          this._hideInputError(this._form, element, this._values.errorClass, this._values.inputErrorClass);
          this._toggleSubmitButton(this._form, this._values.submitButtonSelector, this._values.inactiveButtonClass);
        }
      });
    })
  }

  clearValidation() {
    const _formInputElements = this._form.querySelectorAll(this._values.inputSelector);
    Array.from(_formInputElements).forEach((element) => {
      this._hideInputError(this._form, element, this._values.errorClass, this._values.inputErrorClass);
      this._toggleSubmitButton(this._form, this._values.submitButtonSelector, this._values.inactiveButtonClass);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
