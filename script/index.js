import {
  initialCards, templateSelector, validationValues, profileEditButton,
  cardAddButton, cardListContainerSelector, userJobSelector, userNameSelector,
  popupProfileEditSelector, popupCardAddSelector, popupImageSelector, profileNameInput,
  profileJobInput
} from './constants.js';
import Card from './card.js';
import FormValidator from './formValidator.js';
import PopupWithForm from './popupWithForm.js';
import PopupWithImage from "./popupWithImage.js";
import Section from './section.js';
import UserInfo from './userInfo.js';

// Объявляем экземпляры классов для попапов с формами
const profileEditPopup = new PopupWithForm(popupProfileEditSelector, (inputValues) => {
  userInfo.setUserInfo(inputValues);
});

const cardAddPopup = new PopupWithForm(popupCardAddSelector, (inputValues) => {
  const addingCard = new Card(inputValues, templateSelector, () => {
    new PopupWithImage(popupImageSelector, inputValues).open();
  }).create();
  cardsListSection.addItem(addingCard);
});

//Создаём экземпляры класса formValidator и включаем валидацию
const profileFormValidator = new FormValidator(validationValues, profileEditPopup.form());
const cardAddFormValidator = new FormValidator(validationValues, cardAddPopup.form());
profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

// Объявляем экземпляр класса для работы с разметкой Section
const cardsListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const currentCard = new Card(item, templateSelector, () => {
      new PopupWithImage(popupImageSelector, item).open();
    }).create();
    cardsListSection.addItem(currentCard);
  }
}, cardListContainerSelector);

// Объявляем экземпляр класса для работы с информацией о пользователе
const userInfo = new UserInfo(userNameSelector, userJobSelector);

//Функции обработчики кнопок открытия попапов с формами
function handleProfileEditOpen() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.userName;
  profileJobInput.value = userData.userJob;
  profileEditPopup.open();
  profileFormValidator.clearValidation();
}

function handleCardAddOpen() {
  cardAddFormValidator.clearValidation();
  cardAddPopup.open();
}

// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
profileEditButton.addEventListener('click', handleProfileEditOpen);
cardAddButton.addEventListener('click', handleCardAddOpen);

// Добавляем изначальный список карточек в разметку
cardsListSection.addAllItems();
