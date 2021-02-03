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
  cardImage.addEventListener('click', () => popupRender('photo', name, link));
  cards.prepend(cardCopy);
}

// Функция открывает попап во всех возможных состояниях, значение состояния попапа передаются первым аргументом.
const popupRender = (content, photoTitle, photoLink) => {
  const popupWindow = document.createElement('div');
  popupWindow.classList.add('popup');
  const popupContent = document.querySelector('#popup').content.cloneNode(true);
  // Добавлен обработчик кнопки закрытия для всех возможных состояний попапа
  const closeButton = popupContent.querySelector('.popup__close-button');
  // Функция для закрытия окна попапа удаляет окно из DOM
  const closePopup = () => {popupWindow.remove()};
  closeButton.addEventListener('click', closePopup);
  // Создается разметка для попапа для редактирования профиля
  if (content === 'profileEdit') {
    const formElement = popupContent.querySelector('.popup__container form');
    const formName = formElement.querySelector('.popup__form-field_info_name');
    const formJob = formElement.querySelector('.popup__form-field_info_value');
    formName.value=profileName.textContent;
    formJob.value=profileJob.textContent;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        profileName.textContent=formName.value;
        profileJob.textContent=formJob.value;
        closePopup();
      });
  }
  // Создается разметка для попапа добавления карточки
  if (content === 'cardAdd') {
    popupContent.querySelector('.popup__form-field_info_name').placeholder = 'Название';
    popupContent.querySelector('.popup__form-field_info_name').name = 'place-name';
    popupContent.querySelector('.popup__form-field_info_value').name = 'place-photo-link';
    popupContent.querySelector('.popup__form-field_info_value').placeholder = 'Ссылка на картинку';
    popupContent.querySelector('.popup__submit-button').textContent = 'Создать';
    popupContent.querySelector('.popup__title').textContent = 'Новое место';
    const formElement = popupContent.querySelector('.popup__container form');
    const placeName = formElement.querySelector('.popup__form-field_info_name');
    const photoLink = formElement.querySelector('.popup__form-field_info_value');
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      cardRender(placeName.value, photoLink.value);
      console.log(placeName, photoLink);
      closePopup();
    });
  }
  // Создается разметка для попапа просмотра фото. Из аргументов функции берем название и ссылку.
  if (content === 'photo') {
    popupContent.querySelector('form').remove();
    popupContent.querySelector('.popup__container').classList.remove('popup__container_content_form');
    popupContent.querySelector('.popup__container').classList.add('popup__container_content_photo');
    const photoContainer = document.createElement('img');
    photoContainer.classList.add('popup__photo');
    photoContainer.src = photoLink;
    photoContainer.alt = photoTitle;
    popupContent.querySelector('.popup__title').textContent= photoTitle;
    popupContent.querySelector('.popup__title').classList.add('popup__title_content_photo');
    popupContent.querySelector('.popup__container').prepend(photoContainer);
  }
  // Добавляем содержание попапа в контейнер с окном попапа, добавляем видимость и добавляем попап на страницу
  popupWindow.append(popupContent);
  const PageContainer = document.querySelector('.page');
  PageContainer.append(popupWindow);
  popupWindow.classList.add('popup_opened');
}

// Заполняем карточки данными из массива initialCards
initialCards.forEach(element => {
  cardRender(element.name, element.link);
});
// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление картточки"
editButton.addEventListener('click', () => popupRender('profileEdit'));
addCardButton.addEventListener('click', () => popupRender('cardAdd'));

