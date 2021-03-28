// Данный в задании массив значений для карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
export const popupProfileEditSelector = '.popup_content_profile-edit';
export const popupCardAddSelector = '.popup_content_card-add';
export const popupImageSelector = '.popup_content_photo';

// Объявляем элементы документа
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__plus-button');

// Объявляем формы документа
const forms = document.forms;
const profileForm = forms.profile;
export const profileNameInput = profileForm.elements.userName;
export const profileJobInput = profileForm.elements.userJob;

// Объявление кнопки для закрытия попапа
export const closeKey = 'Escape';
