// Данный в задании массив значений для карточек
const initialCards = [
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
// Объявляем переменные и наполняем значениями из DOM
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__plus-button');
const card = document.querySelector('#card').content;
const cards = document.querySelector('.cards__list');
const popupWindow = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__container')
const closeButton = popupContent.querySelector('.popup__close-button');
const formElement = popupContent.querySelector('.popup__form');
const formName = formElement.querySelector('.popup__form-field_info_name');
const formValue = formElement.querySelector('.popup__form-field_info_value');
const formSubmitButton = formElement.querySelector('.popup__submit-button');
const popupTitle = popupContent.querySelector('.popup__title');
const popupImage = popupContent.querySelector('.popup__photo');
// Объявляем функции
// Функции открытия и закрытия попапа
const closePopup = () => {popupWindow.classList.remove('popup_opened')};
const openPopup = () => {popupWindow.classList.add('popup_opened')};
// Функция для обработки кнопки отправки формы
function formSubmit(evt){
  evt.preventDefault();
  // Если кнопка сохранить - значит необходимо изменить данные профиля
  if(formSubmitButton.textContent === 'Сохранить'){
    profileName.textContent = formName.value;
    profileJob.textContent = formValue.value;}
  // В противном случае вызываем функцию добавления карточки со значениями из формы
  else {cardRender(formName.value, formValue.value);}
  closePopup();
}
//Функция изменяет классы попапа в соответствии с аргументом content, формирует необходимый попап)
const popupRender = (content, photoTitle, photoLink) => {
  // Если попап открывает фото - форма делается невидимой, добавляются необходимые класыы
  if (content ==='photo'){
    formElement.classList.add('popup__form_inactive');
    popupImage.classList.add('popup__photo_active');
    popupContent.classList.remove('popup__container_content_form');
    popupImage.src = photoLink;
    popupImage.alt = photoTitle;
    popupTitle.classList.add('popup__title_content_photo');
    popupTitle.textContent = photoTitle;}
  else {
    // Добавляются общие классы для формы редактированя профиля и добавления новой каротчки
    popupImage.classList.remove('popup__photo_active');
    formElement.classList.remove('popup__form_inactive');
    popupTitle.classList.remove('popup__title_content_photo');
    popupContent.classList.add('popup__container_content_form')
  }
  // Если форма должна редактировать профиль - ее поля заполняются из документа
  if (content === 'profileEdit') {
    formName.value = profileName.textContent;
    formValue.value = profileJob.textContent;
    formSubmitButton.textContent = 'Сохранить';
    popupTitle.textContent = 'Редактировать профиль';}
  // Если форма должна добавить карточку, значения формы обнуляются, текст меняется
  if (content === 'cardAdd') {
    formName.value = '';
    formValue.value = '';
    formName.placeholder = 'Название';
    formValue.placeholder = 'Ссылка на картинку';
    formSubmitButton.textContent = 'Создать';
    popupTitle.textContent = 'Новое место';}
}
// Функция заполняет копию шаблона карточки данными, передаваемыми в качестве аргументов и передает в DOM
const cardRender = (name, link) => {
  const cardCopy = card.cloneNode(true);
  cardCopy.querySelector('.card__title').textContent = name;
  cardCopy.querySelector('.card__image').alt = name;
  cardCopy.querySelector('.card__image').src = link;
  // К каждой карточке добавляем событие для кнопки удаления, которая по клику удаляет элемент списка
  const delButton = cardCopy.querySelector('.card__trash-button');
  delButton.addEventListener('click', () => {
    const deleteCard = delButton.closest('li');
    deleteCard.remove()
  });
  // Аналогично добавляем событие для кнопки лайк
  const likeButton = cardCopy.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active');
  })
  // Добавляем обработчик события для клика по каждой созданной картинке
  const cardImage = cardCopy.querySelector('.card__image');
  cardImage.addEventListener('click', () => {
    popupRender('photo', name, link);
    openPopup();
  });
  cards.prepend(cardCopy);
}

// Добавляем обработчики событий для интерактивных элементов
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmit);
// Закрываем попап при клике на свободное место на странице
popupWindow.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {closePopup()}
});
// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
editButton.addEventListener('click', () => {
  popupRender('profileEdit');
  openPopup();
});
addCardButton.addEventListener('click', () => {
  popupRender('cardAdd');
  openPopup();
});

// Заполняем карточки данными из массива initialCards
initialCards.forEach(element => {
  cardRender(element.name, element.link);
});
