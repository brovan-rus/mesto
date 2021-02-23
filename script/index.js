// Объявлявление переменных

// Объявляем ссылки элементы документа
const popupProfileEdit = document.querySelector('.popup_content_profile-edit');
const popupCardAdd = document.querySelector('.popup_content_card-add');
const popupPhoto = document.querySelector('.popup_content_photo');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__plus-button');
const cardsList = document.querySelector('.cards__list');
// Объявляем ссылку на template
const cardTemplate = document.querySelector('#card').content;

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

// Объявляем ссылки на элемнеты popupPhoto
const popupPhotoImage = popupPhoto.querySelector('.popup__photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__title_content_photo')

// Объявляем функции
// Функции открытия и закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupEventListeners(popup);
  // Если в попапе есть форма - сбросим ее при закрытии окна.
  if (popup.querySelector('.form')) {
    resetForm(popup);
  }
}

function resetForm(popup) {
  const popupForm = popup.querySelector('.form');
  const inputList = Array.from(popupForm.querySelectorAll(validationValues.inputSelector));
  inputList.forEach((element) => {
    hideInputError(popupForm, element, validationValues.errorClass, validationValues.inputErrorClass);
  });
  popupForm.reset();
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  addPopupEventListeners(popup);
}

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

// Функции работы с карточками
// Функция удаления карточки
function handleDeleteCard(evt) {
  evt.target.closest('li').remove();
}

// Функция лайка карточки
function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

// Функция обработчик клика по изображению карточки
function handlePreviewPicture(data) {
  popupPhotoImage.src = data.link;
  popupPhotoImage.alt = data.name;
  popupPhotoTitle.textContent = data.name;
  openPopup(popupPhoto);
}

// Функция создания карточки из template
function createCard(cardData) {
  const cardCopy = cardTemplate.cloneNode('true');
  cardCopy.querySelector('.card__title').textContent = cardData.name;
  const cardImage = cardCopy.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener('click', () => handlePreviewPicture(cardData));
  const delButton = cardCopy.querySelector('.card__trash-button');
  delButton.addEventListener('click', handleDeleteCard);
  const likeButton = cardCopy.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLikeCard);
  return cardCopy;
}

// Функция добавления карточки в разметку
function renderCard(data, wrap) {
  wrap.prepend(createCard(data));
}

//Функции обработчики кнопок открытия попапов с формами
function handleProfileEditOpen() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
}

function handleCardAddOpen() {
  toggleSubmitButton(cardAddForm, validationValues.submitButtonSelector, validationValues.inactiveButtonClass);
  openPopup(popupCardAdd);
}

//Обработчики событый
//Обработчики событий попапов

function closeOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget);
  }
}

function closeOnOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

function handleClosePopupButton(evt) {
  if (evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

function addPopupEventListeners(popup) {
  popup.addEventListener('keydown', closeOnEscape);
  popup.addEventListener('click', closeOnOverlay);
  popup.addEventListener('click', handleClosePopupButton);
}

function removePopupEventListeners(popup) {
  popup.removeEventListener('keydown', closeOnEscape);
  popup.removeEventListener('click', closeOnOverlay);
  popup.removeEventListener('click', handleClosePopupButton);
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
