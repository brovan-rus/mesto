const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const card = document.querySelector('#card').content;
const cards = document.querySelector('.cards__list');
const addCardButton = document.querySelector('.profile__plus-button');
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

// Функция заполняет копию шаблона карточки данными, передаваемыми в качестве аргументов
const cardRender = (name, link) => {
  const cardCopy = card.cloneNode(true);
  cardCopy.querySelector('.card__title').textContent = name;
  cardCopy.querySelector('.card__image').alt = name;
  cardCopy.querySelector('.card__image').src = link;
  cards.prepend(cardCopy);
}

// Заполняем карточки данными из массива initialCards
initialCards.forEach(element => {
  cardRender(element.name, element.link);
});

// Функция открывает попап во всех возможных состояниях
const popupRender = (content) => {
  const popupWindow = document.createElement('div');
  popupWindow.classList.add('popup');
  const popupContent = document.querySelector('#popup').content.cloneNode(true);
  // кнопка закрытия для всех попапов
  const closeButton = popupContent.querySelector('.popup__close-button');
  const closePopup = () => {popupWindow.classList.remove('popup_opened');}
  closeButton.addEventListener('click', closePopup);
  // Создается разметка для попапа для редактирования профиля
  if (content === 'ProfileEdit') {
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
  if (content === 'CardAdd') {
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
  // Открывается разметка для попапа просмотра фото
  if (content === 'photo') {}

  popupWindow.append(popupContent);
  popupWindow.classList.add('popup_opened');
  const PageContainer = document.querySelector('.page');
  PageContainer.append(popupWindow);
}

editButton.addEventListener('click', () => popupRender('ProfileEdit'));
addCardButton.addEventListener('click', () => popupRender('CardAdd'));

