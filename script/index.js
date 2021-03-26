import {
  initialCards, templateSelector, validationValues,
  popupCardAdd, profileName, profileJob, profileEditButton, cardAddButton, cardsList, forms, cardListContainerSelector
} from './constants.js';
import Card from './card.js';
// import {openPopup, closePopupWithForm} from './utils.js';
import FormValidator from './formValidator.js';
import PopupWithForm from './popupWithForm.js';
import PopupWithImage from "./popupWithImage.js";
import Section from './section.js';

const profileEditPopup = new PopupWithForm('.popup_content_profile-edit', (inputValues) => {
  profileName.textContent = inputValues.name;
  profileJob.textContent = inputValues.job;
});

const cardAddPopup = new PopupWithForm('.popup_content_card-add', (inputValues) => {
  const addingCard = new Card (inputValues, templateSelector, () => {
      new PopupWithImage('.popup_content_photo', inputValues).open();
    }).create();
  cardsListSection.addItem(addingCard);
});

// function handleCardAdd(evt) {
//   evt.preventDefault();
//   // Объявляем переменную для хранения данных карточки
//   const cardData = {name: '', link: ''}
//   cardData.name = cardNameInput.value;
//   cardData.link = cardLinkInput.value;
//   renderCard(cardData, cardsList);
//   //closePopupWithForm(popupCardAdd);
// }

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
// function handleProfileEdit(evt) {
//   evt.preventDefault();
//   profileName.textContent = profileNameInput.value;
//   profileJob.textContent = profileJobInput.value;
//   closePopupWithForm(popupProfileEdit);
// }



// Функция создания карточки
function createCard(data, templateSelector) {
  return new Card(data, templateSelector,
    () => {
      new PopupWithImage('.popup_content_photo', data).open()
    })
    .create();
}

//Функции обработчики кнопок открытия попапов с формами
function handleProfileEditOpen() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileEditPopup.open();
  profileFormValidator.clearValidation();
}

function handleCardAddOpen() {
  cardAddFormValidator.clearValidation();
  cardAddPopup.open();
}

// Обрабочики событий отправки форм
// cardAddForm.addEventListener('submit', handleCardAdd);
//profileForm.addEventListener('submit', handleProfileEdit);
// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
profileEditButton.addEventListener('click', handleProfileEditOpen);
cardAddButton.addEventListener('click', handleCardAddOpen);

// Создаём экземляр класса с разметкой для рендеринга начального списка карточек.
const cardsListSection = new Section({items: initialCards,
  renderer: (item) => {
    const currentCard = new Card(item, templateSelector, () => {
      new PopupWithImage('.popup_content_photo', item).open();
    }).create();
    cardsListSection.addItem(currentCard);
  }}, cardListContainerSelector);

cardsListSection.addAllItems();

// // Функция добавления карточки в разметку
// function renderCard(data, wrap) {
//   wrap.prepend(createCard(data, templateSelector));
// }
