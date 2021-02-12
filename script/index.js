// Объявлявление переменных
// Объявляем ссылки элементы документа
const popupProfileEdit = document.querySelector('.popup_content_profile-edit');
// Добавляем обработчик закрытия по overlay
popupProfileEdit.addEventListener('click', (evt) => {if (evt.currentTarget === evt.target){closePopup(popupProfileEdit);}});
const popupCardAdd = document.querySelector('.popup_content_card-add');
// Добавляем обработчик закрытия по overlay
popupCardAdd.addEventListener('click', (evt) => {if (evt.currentTarget === evt.target){closePopup(popupCardAdd);}});
const popupPhoto = document.querySelector('.popup_content_photo');
// Добавляем обработчик закрытия по overlay
popupPhoto.addEventListener('click', (evt) => {if (evt.currentTarget === evt.target){closePopup(popupPhoto);}});
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__plus-button');
const cardsList = document.querySelector('.cards__list');
// Объявляем ссылку на template
const cardTemplate = document.querySelector('#card').content;
// Объявляем ссылки на элементы popupProfileEdit
const profileEditCloseButton = popupProfileEdit.querySelector('.popup__close-button');
const formProfileName = popupProfileEdit.querySelector('.popup__form-field_info_name');
const formProfileJob = popupProfileEdit.querySelector('.popup__form-field_info_value');
const profileEditFormElement = popupProfileEdit.querySelector('.popup__form');

// Объявляем ссылки на элементы popupCardAdd
const cardAddCloseButton = popupCardAdd.querySelector('.popup__close-button');
const cardName = popupCardAdd.querySelector('.popup__form-field_info_name');
const cardLink = popupCardAdd.querySelector('.popup__form-field_info_value');
const cardAddFormElement = popupCardAdd.querySelector('.popup__form');

// Объявляем ссылки на элемнеты popupPhoto
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');
const popupPhotoImage = popupPhoto.querySelector('.popup__photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__title_content_photo')

// Объявляем функции
// Функции открытия и закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // Закрываем попап при клике на свободное место на странице
}

// Функция для обработки кнопок отправки формы
function handleProfileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = formProfileName.value;
  profileJob.textContent = formProfileJob.value;
  closePopup(popupProfileEdit);
}
function handleCardAdd(evt) {
  evt.preventDefault();
  // Объявляем переменную для хранения данных карточки
  const cardData = {title: '', link: ''}
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  renderCard(cardData, cardsList);
  evt.target.reset();
  closePopup(popupCardAdd);
}
// Функции работы с карточками
// Функция удаления карточки
function handleDeleteCard(evt) {evt.target.closest('li').remove();}
// Функция лайка карточки
function handleLikeCard(evt) {evt.target.classList.toggle('card__like-button_active');}
// Функция обработчик клика по изображению карточки
function handlePreviewPicture(data) {
  popupPhotoImage.src = data.link;
  popupPhotoImage.alt = data.name;
  popupPhotoTitle.textContent = data.name;
  openPopup(popupPhoto);
}
// Функция создания карточки из template
function createCard(cardData){
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
function renderCard(data, wrap) {wrap.prepend(createCard(data));}
//Функции обработчики кноппок открытия попапов с формами
function handleProfileEditOpen() {
  formProfileName.value = profileName.textContent;
  formProfileJob.value = profileJob.textContent;
  openPopup(popupProfileEdit);
}
function handleCardAddOpen() {
  openPopup(popupCardAdd);
}

//Обработчики кнопок закрытия попапов
cardAddCloseButton.addEventListener('click', () => closePopup(popupCardAdd));
profileEditCloseButton.addEventListener('click', () => closePopup(popupProfileEdit));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
// Обрабочики кнопок отправки формы попапов
cardAddFormElement.addEventListener('submit', handleCardAdd);
profileEditFormElement.addEventListener('submit', handleProfileEdit);
// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
profileEditButton.addEventListener('click', handleProfileEditOpen);
cardAddButton.addEventListener('click', handleCardAddOpen);

// Заполняем карточки данными из массива initialCards
initialCards.forEach(element => {renderCard(element, cardsList);});
