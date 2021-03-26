

// Функции открытия и закрытия попапа

// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   addPopupEventListeners(popup);
// }

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupEventListeners(popup);
  // Если в попапе есть форма - сбросим форму при закрытии окна.
  // const popupForm = popup.querySelector('.form');
  // if (popupForm) {
  //   popupForm.reset();
  // }
}

// export function closePopupWithForm(popup) {
//   closePopup(popup);
//   const popupForm = popup.querySelector('.form');
//   popupForm.reset();
// }

// function handleClosePopupButton(evt) {
//   if (evt.target.classList.contains('popup__close-button')) {
//     // Если попап с формой - вызывается функция закрытия попапа с формой.
//     if (evt.currentTarget.querySelector('.form')) {
//       closePopupWithForm(evt.currentTarget);
//     } else {
//       closePopup(evt.currentTarget);
//     }
//   }
// }

// function closeOnOverlay(evt) {
//   if (evt.currentTarget === evt.target) {
//     // Если попап с формой - вызывается функция закрытия попапа с формой.
//     if (evt.currentTarget.querySelector('.form')) {
//       closePopupWithForm(evt.currentTarget);
//     } else {
//       closePopup(evt.currentTarget);
//     }
//   }
// }

// function closeOnEscape(evt) {
//   // ищем отрытый попап и закрываем его
//   if (evt.key === closeKey) {
//     const openedPopup = document.querySelector('.popup_opened');
//     // Если попап с формой - вызывается функция закрытия попапа с формой.
//     if (openedPopup.querySelector('.form')) {
//       closePopupWithForm(openedPopup);
//     } else {
//       closePopup(openedPopup);
//     }
//   }
// }
//
// function addPopupEventListeners(popup) {
//   popup.closest('body').addEventListener('keydown', closeOnEscape);
//   popup.addEventListener('click', closeOnOverlay);
//   popup.addEventListener('click', handleClosePopupButton);
// }
//
// function removePopupEventListeners(popup) {
//   popup.closest('body').removeEventListener('keydown', closeOnEscape);
//   popup.removeEventListener('click', closeOnOverlay);
//   popup.removeEventListener('click', handleClosePopupButton);
// }
