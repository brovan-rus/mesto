const popupWindow = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container form');
const formName = formElement.querySelector('.popup__form-field_info_name');
const formJob = formElement.querySelector('.popup__form-field_info_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
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
let cardList = initialCards;
const openPopup = () => {
  formName.value=profileName.textContent;
  formJob.value=profileJob.textContent;
  popupWindow.classList.add('popup_opened');
}

const closePopup = () => {
  popupWindow.classList.remove('popup_opened');
}

const formSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent=formName.value;
  profileJob.textContent=formJob.value;
  closePopup();
}

const cardsRender = (cardList) => {
  const cardContainer = document.createElement('ul');
  cardContainer.classList.add('cards__list');
  const card = document.querySelector('#card').content;
  cardList.forEach(element => {
    card.querySelector('.card__title').textContent = element.name;
    card.querySelector('.card__image').src = element.link;
    cardContainer.append(card.querySelector('li').cloneNode(true));
    console.log(element);
  });
  return cardContainer;

  console.log(cardContainer, card);

}

const cards = document.querySelector('.cards');
console.log(cards);
cards.append(cardsRender(cardList));

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmit);

