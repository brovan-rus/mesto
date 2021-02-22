const isInvalid = (formElement) => {return !formElement.validity.valid;}

const showInputError = (form, inputElement, errorMessage, errorClass, inputErrorClass) => {
  const errorMessageContainer = form.querySelector(`.${inputElement.id}-error`);
  errorMessageContainer.classList.add(errorClass);
  errorMessageContainer.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
}
const hideInputError = (form, inputElement, ErrorClass, inputErrorClass) => {
  const errorMessageContainer = form.querySelector(`.${inputElement.id}-error`);
  errorMessageContainer.classList.remove(ErrorClass);
  errorMessageContainer.textContent = ''
  inputElement.classList.remove(inputErrorClass);
}
const toggleSubmitButton = (form, submitButtonSelector, inactiveButtonClass) => {
  const submitButton = form.querySelector(submitButtonSelector);
  if (Array.from(form.elements).some((element) => isInvalid(element))) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }
  else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

const setEventListeners = (form, input, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const formInputElements = form.querySelectorAll(input);
  toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass);
  Array.from(formInputElements).forEach( (element) => {
    element.addEventListener('input', () => {
      if (isInvalid(element)) {
        showInputError(form, element, element.validationMessage, errorClass, inputErrorClass);
        toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass)}
      else {
        hideInputError(form, element, errorClass, inputErrorClass);
        toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass);
      }
    });
  })
}

const enableValidationValues= {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'};

const enableValidation = (values) => {
  const formsList = Array.from(document.querySelectorAll(values.formSelector));
  formsList.forEach((element) => {
    setEventListeners(element, values.inputSelector, values.submitButtonSelector, values.inactiveButtonClass, values.inputErrorClass, values.errorClass);
  });
}

enableValidation(enableValidationValues);








