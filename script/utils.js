import {FormValidator} from "./formValidator.js";
import {closeKey, validationValues} from "./initilize.js";

// Функции открытия и закрытия попапа

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addPopupEventListeners(popup);
  // Если в попапе есть форма - включим валидацию при открытии окна.
  const popupForm = popup.querySelector('.form');
  if (popupForm) {
    new FormValidator(validationValues, popupForm).enableValidation();
  }
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupEventListeners(popup);
  // Если в попапе есть форма - сбросим форму при закрытии окна.
  const popupForm = popup.querySelector('.form');
  if (popupForm) {
    popupForm.reset();
  }
}

function handleClosePopupButton(evt) {
  if (evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

function closeOnOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

function closeOnEscape(evt) {
  // ищем отрытый попап и закрываем его
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === closeKey) {
    closePopup(openedPopup);
  }
}

function addPopupEventListeners(popup) {
  popup.closest('body').addEventListener('keydown', closeOnEscape);
  popup.addEventListener('click', closeOnOverlay);
  popup.addEventListener('click', handleClosePopupButton);
}

function removePopupEventListeners(popup) {
  popup.closest('body').removeEventListener('keydown', closeOnEscape);
  popup.removeEventListener('click', closeOnOverlay);
  popup.removeEventListener('click', handleClosePopupButton);
}
