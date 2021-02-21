
const isInvalid = (formElement) => {return !formElement.validity.valid;}

const showInputError = (form, formElement) => {
  const errorMessageContainer = form.querySelector(`.${formElement.id}-error`);
  errorMessageContainer.classList.add('form__input-error_active');
  errorMessageContainer.textContent = 'Ошибка!!!!'
}

console.log(forms.profile.name);
showInputError(forms.profile, forms.profile.name);
showInputError(forms.profile, forms.profile.job);
showInputError(forms.card, forms.card.link);
showInputError(forms.card, forms.card.name);

const hideInputError = (formElement) => {};



