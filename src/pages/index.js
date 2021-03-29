import {
  initialCards, templateSelector, validationValues, profileEditButton,
  cardAddButton, cardListContainerSelector, userJobSelector, userNameSelector,
  popupProfileEditSelector, popupCardAddSelector, popupImageSelector, profileNameInput,
  profileJobInput
} from '../components/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/formValidator.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from "../components/popupWithImage.js";
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';

// Объявляем экземпляры классов для попапов
const profileEditPopup = new PopupWithForm(popupProfileEditSelector, (inputValues) => {
  userInfo.setUserInfo(inputValues);
});

const popupWithImage = new PopupWithImage(popupImageSelector);

const cardAddPopup = new PopupWithForm(popupCardAddSelector, (inputValues) => {
  cardsListSection.addItem(createCard(inputValues));
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
    cardsListSection.addItem(createCard(item));
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

function createCard(inputValues) {
  const card = new Card(inputValues, templateSelector, () => {
    popupWithImage.open(inputValues);
  });
  return card.create();
}

// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
profileEditButton.addEventListener('click', handleProfileEditOpen);
cardAddButton.addEventListener('click', handleCardAddOpen);

// Добавляем изначальный список карточек в разметку
cardsListSection.addAllItems();
