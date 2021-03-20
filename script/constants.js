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

export const templateSelector = '#card';
export const closeKey = 'Escape';

// Объявляем элементы popup
export const popupProfileEdit = document.querySelector('.popup_content_profile-edit');
export const popupCardAdd = document.querySelector('.popup_content_card-add');
export const popupPhoto = document.querySelector('.popup_content_photo');
export const popupPhotoImage = popupPhoto.querySelector('.popup__photo');
export const popupPhotoTitle = popupPhoto.querySelector('.popup__title_content_photo');

// Объявляем элементы документа
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__plus-button');
export const cardsList = document.querySelector('.cards__list');

// Объявляем формы документа
export const forms = document.forms;
