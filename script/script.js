const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__plus-button');
const card = document.querySelector('#card').content;
const cards = document.querySelector('.cards__list');
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
const page = document.querySelector('.page');
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
  // Добавляем события для клика по картинке
  const cardImage = cardCopy.querySelector('.card__image');
  cardImage.addEventListener('click', () => {
    popupRender('photo', name, link);
    openPopup();
  });
  cards.prepend(cardCopy);
}

const popupWindow = document.querySelector('.popup');
const closePopup = () => {popupWindow.classList.remove('popup_opened')};
const openPopup = () => {popupWindow.classList.add('popup_opened')};
const popupContent = document.querySelector('.popup__container')
const closeButton = popupContent.querySelector('.popup__close-button');
closeButton.addEventListener('click', closePopup);
const formElement = popupContent.querySelector('.popup__form');
const formName = formElement.querySelector('.popup__form-field_info_name');
const formValue = formElement.querySelector('.popup__form-field_info_value');
const formSubmitButton = formElement.querySelector('.popup__submit-button');
const popupTitle = popupContent.querySelector('.popup__title');
const popupImage = popupContent.querySelector('.popup__photo');

//Функция изменяет классы попапа в соответствии с аргументом content)
const popupRender = (content, photoTitle, photoLink) => {
  if (content ==='photo'){
    formElement.classList.add('popup__form_inactive');
    popupImage.classList.add('popup__photo_active');
    popupContent.classList.remove('popup__container_content_form');
    popupImage.src = photoLink;
    popupImage.alt = photoTitle;
    popupTitle.classList.add('popup__title_content_photo');
    popupTitle.textContent = photoTitle;

  };
  if (content === 'profileEdit') {
    popupImage.classList.remove('popup__photo_active');
    formElement.classList.remove('popup__form_inactive');
    popupTitle.classList.remove('popup__title_content_photo');
    popupContent.classList.add('popup__container_content_form')
    formName.value = profileName.textContent;
    formValue.value = profileJob.textContent;
    formSubmitButton.textContent = 'Сохранить';
    popupTitle.textContent = 'Редактировать профиль';
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      profileName.textContent = formName.value;
      profileJob.textContent = formValue.value;
      closePopup();
    });
  }
  if (content === 'cardAdd') {
    popupImage.classList.remove('popup__photo_active');
    formElement.classList.remove('popup__form_inactive');
    popupTitle.classList.remove('popup__title_content_photo');
    popupContent.classList.add('popup__container_content_form');
    formName.value = 'Название';
    formValue.value = 'Ссылка на картинку';
    formSubmitButton.textContent = 'Создать';
    popupTitle.textContent = 'Новое место';
    const placeName = formElement.querySelector('.popup__form-field_info_name');
    const photoLink = formElement.querySelector('.popup__form-field_info_value');
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      cardRender(placeName.value, photoLink.value);
      closePopup();
    });
  }
}

// Заполняем карточки данными из массива initialCards
initialCards.forEach(element => {
  cardRender(element.name, element.link);
});
// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление картточки"
editButton.addEventListener('click', () => {
  popupRender('profileEdit');
  openPopup();
});
addCardButton.addEventListener('click', () => {
  popupRender('cardAdd');
  openPopup();
});
