// Данные для работы с API
export const apiUrl = 'https://mesto.nomoreparties.co';
export const cohort = 22;
export const token = 'a117537f-0d63-496d-890f-35a7461e03ea';

// Изначальные значения для настройки валидации форм
export const validationValues = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Объявление селекторов документа

export const templateSelector = '#card';
export const cardListContainerSelector = '.cards__list';
export const userNameSelector = '.profile__name';
export const userJobSelector = '.profile__job';
export const userAvatarSelector = '.profile__photo'
export const popupProfileEditSelector = '.popup_content_profile-edit';
export const popupCardAddSelector = '.popup_content_card-add';
export const popupImageSelector = '.popup_content_photo';
export const popupCardDeleteSelector = '.popup_content_delete-card';
export const popupAvatarRenewSelector = '.popup_content_avatar-renew';

// Объявляем элементы документа
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__plus-button');
export const avatarElement = document.querySelector('.profile__photo')

// Объявляем формы документа
const forms = document.forms;
const profileForm = forms.profile;
export const profileNameInput = profileForm.elements.userName;
export const profileJobInput = profileForm.elements.userJob;

// Объявление кнопки для закрытия попапа
export const closeKey = 'Escape';
