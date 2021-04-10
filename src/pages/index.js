import {
  templateSelector, validationValues, profileEditButton,
  cardAddButton, cardListContainerSelector, userJobSelector, userNameSelector,
  popupProfileEditSelector, popupCardAddSelector, popupImageSelector, profileNameInput,
  profileJobInput, userAvatarSelector, cohort, apiUrl, token, popupCardDeleteSelector, popupAvatarRenewSelector, avatarElement
} from '../components/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/formValidator.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from "../components/popupWithImage.js";
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';
import Api from '../components/api.js';
import PopupWithOneButton from '../components/popupWithOneButton.js';




// Создаём экземляр класса для работы с API
const api = new Api (apiUrl, cohort, token);
// Объявляем экземпляр класса для работы с информацией о пользователе
const userInfo = new UserInfo(userNameSelector, userJobSelector, userAvatarSelector);

const popupWithOneButton = new PopupWithOneButton(
  popupCardDeleteSelector, (cardID, evt) => {
    api.removeCard(cardID)
      .then((answer) => {
        evt.target.closest('li').remove();
        popupWithOneButton.close()
      })
      .catch((err) => console.log(err));
  }
);

// Функция заполнения карточек согласно запросу с сервера
function setCardListFromServer() {
  api.getCurrentUser()
    .then((userInfo) => {
      return (userInfo._id)
    })
    .then((userID) => {
      api.getInitialCards()
        .then((cardsList) => {
          const cardData = [{
            name: '',
            link: '',
            id: '',
            likes: 0,
            isLikedByMe: false,
            owner: false
          }];

          cardsList.forEach((card) => {
            cardData.name = card.name;
            cardData.link = card.link;
            cardData.id = card._id;
            cardData.likes = card.likes.length;
            cardData.isLikedByMe = card.likes.some((like) => {return (like._id === userID)})
            cardData.owner = card.owner._id === userID
            cardsListSection.addItem((createCard(cardData)));
          })
        })
    })
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

// Объявляем экземпляры классов для попапов
const profileEditPopup = new PopupWithForm(popupProfileEditSelector, (inputValues) => {
  renewUserInfo(inputValues);
});
const popupWithImage = new PopupWithImage(popupImageSelector);


const cardAddPopup = new PopupWithForm(popupCardAddSelector,
  (inputValues) => {
    inputValues.owner = true;
    api.addNewCard(inputValues)
      .then((answer) => {
        inputValues.id = answer._id;
        cardsListSection.addItemToTop(createCard(inputValues),)
      })
      .catch((err) => console.log(err))
  }
);

const popupAvatarChange = new PopupWithForm(popupAvatarRenewSelector, (inputValues) => {
  console.log(inputValues);
  api.avatarChange(inputValues.link)
    .then((answer) => {
      console.log(answer);
      setUserFromServer();
    })
    .catch((err) => {console.log(`Произошла ошибка ${err}`)})
})


//Создаём экземпляры класса formValidator и включаем валидацию
const profileFormValidator = new FormValidator(validationValues, profileEditPopup.form());
const cardAddFormValidator = new FormValidator(validationValues, cardAddPopup.form());
profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

// Объявляем экземпляр класса для работы с разметкой Section
const cardsListSection = new Section(cardListContainerSelector);


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

    (evt) => {
      const currentCardData = {
        link: `${evt.target.src}`,
        name: `${evt.path[1].querySelector('.card__title').textContent}`
      }
      popupWithImage.open(currentCardData);
    },

    (cardID, isLikedByMe) => {
      if (!isLikedByMe) {
        api.setCardLike(cardID)
          .then((answer) => answer.likes.length)
          .then((likes) => {
            card.renewLikeCounter(likes);
          })
          .catch((err) => console.log(err))
      }
      else {
        api.removeCardLike(cardID)
          .then((answer) => answer.likes.length)
          .then((likes) => {
            card.renewLikeCounter(likes);
          })
          .catch(((err) => console.log(err)))
      }
    },

    (cardID, evt) => {
      popupWithOneButton.open(cardID, evt);
    }

  );
  return card.create();
}

function handleAvatarChangeOpen(){
  popupAvatarChange.open();
}

setCardListFromServer();
setUserFromServer();

// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
profileEditButton.addEventListener('click', handleProfileEditOpen);
cardAddButton.addEventListener('click', handleCardAddOpen);
avatarElement.addEventListener('click', handleAvatarChangeOpen)

