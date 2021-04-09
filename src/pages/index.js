import {
  initialCards, templateSelector, validationValues, profileEditButton,
  cardAddButton, cardListContainerSelector, userJobSelector, userNameSelector,
  popupProfileEditSelector, popupCardAddSelector, popupImageSelector, profileNameInput,
  profileJobInput, userAvatarSelector, cohort, apiUrl, token
} from '../components/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/formValidator.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from "../components/popupWithImage.js";
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';
import Api from '../components/api.js';

// Создаём экземляр класса для работы с API
const api = new Api (apiUrl, cohort, token);
// Объявляем экземпляр класса для работы с информацией о пользователе
const userInfo = new UserInfo(userNameSelector, userJobSelector, userAvatarSelector);


// `

// Функция заполнения карточек согласно запросу с сервера
function setCardListFromServer() {
  api.getInitialCards()
    .then((answer) => {
      answer.forEach((element) => {
          cardsListSection.addItem(
            createCard({
              name: `${element.name}`,
              link: `${element.link}`,
              likes: `${element.likes.length}`,
              id: `${element._id}`
            })
          );
        }
      )
    })
    .catch((answer) => console.log(answer));
}



//Функция установки данных пользователя согласно ответу с сервера
function setUserFromServer () {
  api.getCurrentUser()
    .then((answer) => userInfo.getUserInfo(answer))
    .then((userData) => userInfo.setUserInfo(userData))
    .catch((err) => console.log(err));
}

//Функция обновления данных пользователя в профиле и на сервере
function renewUserInfo(userData) {
  api.setCurrentUser(userData)
    .then((answer) => setUserFromServer())
    .catch((err) => console.log(err));
}


setCardListFromServer();
setUserFromServer();



// Объявляем экземпляры классов для попапов
const profileEditPopup = new PopupWithForm(popupProfileEditSelector, (inputValues) => {
  renewUserInfo(inputValues);
});

const popupWithImage = new PopupWithImage(popupImageSelector);

const cardAddPopup = new PopupWithForm(popupCardAddSelector,
  (inputValues) => {
    api.addNewCard(inputValues)
      .then((answer) => cardsListSection.addItemToTop(createCard(inputValues),))
      .catch((err) => console.log(err))
  }
);

//Создаём экземпляры класса formValidator и включаем валидацию
const profileFormValidator = new FormValidator(validationValues, profileEditPopup.form());
const cardAddFormValidator = new FormValidator(validationValues, cardAddPopup.form());
profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

// Объявляем экземпляр класса для работы с разметкой Section
const cardsListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsListSection.addItem(createCard(item));
  }
}, cardListContainerSelector);


//Функции обработчики кнопок открытия попапов с формами
function handleProfileEditOpen() {
    api.getCurrentUser()
      .then((answer) => userInfo.getUserInfo(answer))
      .then((userData) => {
        profileNameInput.value = userData.userName;
        profileJobInput.value = userData.userJob;
        profileEditPopup.open();
        profileFormValidator.clearValidation();
      })
      .catch((err) => console.log(err));
}

function handleCardAddOpen() {
  cardAddFormValidator.clearValidation();
  cardAddPopup.open();
}

function createCard(inputValues) {
  const card = new Card(
    inputValues,
    templateSelector,
    () => {
    popupWithImage.open(inputValues);
  },
    () => {


    }
  );
  return card.create();
}

// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
profileEditButton.addEventListener('click', handleProfileEditOpen);
cardAddButton.addEventListener('click', handleCardAddOpen);

// // Добавляем изначальный список карточек в разметку
// cardsListSection.addAllItems();
