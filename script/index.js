import {initialCards, templateSelector, validationValues} from './initilize.js';
import {Card} from './card.js';
import {openPopup, closePopup} from './utils.js';
import {FormValidator} from "./formValidator.js";

// Объявляем ссылки на элементы popup
const popupProfileEdit = document.querySelector('.popup_content_profile-edit');
const popupCardAdd = document.querySelector('.popup_content_card-add');

// Объявляем ссылки элементы документа
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__plus-button');
const cardsList = document.querySelector('.cards__list');

// Объявляем элементы форм
const forms = document.forms;
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
  closePopup(popupProfileEdit);
}

function handleCardAdd(evt) {
  evt.preventDefault();
  // Объявляем переменную для хранения данных карточки
  const cardData = {name: '', link: ''}
  cardData.name = cardNameInput.value;
  cardData.link = cardLinkInput.value;
  renderCard(cardData, cardsList);
  closePopup(popupCardAdd);
}

// Функция добавления карточки в разметку
function renderCard(data, wrap) {
  wrap.prepend(new Card(data, templateSelector).create());
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
