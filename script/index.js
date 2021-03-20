import {
  initialCards, templateSelector, validationValues, popupProfileEdit,
  popupCardAdd, profileName, profileJob, profileEditButton, cardAddButton, cardsList, forms
} from './constants.js';
import {Card} from './card.js';
import {openPopup, closePopupWithForm} from './utils.js';
import {FormValidator} from "./formValidator.js";

// Объявление элементов форм
const profileForm = forms.profile;
const profileNameInput = profileForm.elements.name;
const profileJobInput = profileForm.elements.job;
const cardAddForm = forms.card;
const cardNameInput = cardAddForm.elements.name;
const cardLinkInput = cardAddForm.elements.link;
profileNameInput.value = profileName.textContent;
profileJobInput.value = profileJob.textContent;

// Создаём экземпляры класса formValidator
const profileFormValidator = new FormValidator(validationValues, profileForm);
const cardAddFormValidator = new FormValidator(validationValues, cardAddForm);
profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

// Функция для обработки кнопок отправки формы
function handleProfileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopupWithForm(popupProfileEdit);
}

function handleCardAdd(evt) {
  evt.preventDefault();
  // Объявляем переменную для хранения данных карточки
  const cardData = {name: '', link: ''}
  cardData.name = cardNameInput.value;
  cardData.link = cardLinkInput.value;
  renderCard(cardData, cardsList);
  closePopupWithForm(popupCardAdd);
}

// Функция создания карточки
function createCard(data, templateSelector) {
  return new Card(data, templateSelector).create();
}

// Функция добавления карточки в разметку
function renderCard(data, wrap) {
  wrap.prepend(createCard(data, templateSelector));
}

//Функции обработчики кнопок открытия попапов с формами
function handleProfileEditOpen() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileFormValidator.clearValidation();
  openPopup(popupProfileEdit);
}

function handleCardAddOpen() {
  cardAddFormValidator.clearValidation();
  openPopup(popupCardAdd);
}

// Обрабочики событий отправки форм
cardAddForm.addEventListener('submit', handleCardAdd);
profileForm.addEventListener('submit', handleProfileEdit);
// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
profileEditButton.addEventListener('click', handleProfileEditOpen);
cardAddButton.addEventListener('click', handleCardAddOpen);

// Заполнение карточек данными из массива initialCards
initialCards.forEach(element => {
  renderCard(element, cardsList);
});
