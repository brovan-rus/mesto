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
    errorMessageContainer.textContent = ''
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

  _setEventListeners(form, input, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    const _formInputElements = form.querySelectorAll(input);
    this._toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass);
    Array.from(_formInputElements).forEach((element) => {
      element.addEventListener('input', () => {
        if (this._isInvalid(element)) {
          this._showInputError(form, element, element.validationMessage, errorClass, inputErrorClass);
          this._toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass)
        } else {
          this._hideInputError(form, element, errorClass, inputErrorClass);
          this._toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass);
        }
      });
    })
  }

  enableValidation() {
    this._setEventListeners(this._form, this._values.inputSelector,
      this._values.submitButtonSelector,
      this._values.inactiveButtonClass,
      this._values.inputErrorClass,
      this._values.errorClass);
  }
}


// const isInvalid = (formElement) => {
//   return !formElement.validity.valid;
// }

// const showInputError = (form, inputElement, errorMessage, errorClass, inputErrorClass) => {
//   const errorMessageContainer = form.querySelector(`.${inputElement.id}-error`);
//   errorMessageContainer.classList.add(errorClass);
//   errorMessageContainer.textContent = errorMessage;
//   inputElement.classList.add(inputErrorClass);
// }
// const hideInputError = (form, inputElement, errorClass, inputErrorClass) => {
//   const errorMessageContainer = form.querySelector(`.${inputElement.id}-error`);
//   errorMessageContainer.classList.remove(errorClass);
//   errorMessageContainer.textContent = ''
//   inputElement.classList.remove(inputErrorClass);
// }
// const toggleSubmitButton = (form, submitButtonSelector, inactiveButtonClass) => {
//   const submitButton = form.querySelector(submitButtonSelector);
//   if (Array.from(form.elements).some((element) => isInvalid(element))) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.setAttribute('disabled', true);
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.removeAttribute('disabled');
//   }
// }
// const setEventListeners = (form, input, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
//   const formInputElements = form.querySelectorAll(input);
//   toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass);
//   Array.from(formInputElements).forEach((element) => {
//     element.addEventListener('input', () => {
//       if (isInvalid(element)) {
//         showInputError(form, element, element.validationMessage, errorClass, inputErrorClass);
//         toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass)
//       } else {
//         hideInputError(form, element, errorClass, inputErrorClass);
//         toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass);
//       }
//     });
//   })
// }
// const enableValidation = (values) => {
//   const formsList = Array.from(document.querySelectorAll(values.formSelector));
//   formsList.forEach((element) => {
//     setEventListeners(element, values.inputSelector, values.submitButtonSelector, values.inactiveButtonClass, values.inputErrorClass, values.errorClass);
//   });
// }
// enableValidation(validationValues);








