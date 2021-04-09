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
            //console.log(card.likes);
            //console.log(card.name, card.likes, cardData.isLikedByMe);
          })



          // for (let i=0; i<=cardsList.length, i++){
          // }

          // console.log(cardData);

          // cardsList.forEach((card) => {
          //  card.likes.forEach((like) => {
          //    if (like._id === userID) {
          //
          //
          //
          //      })
          //     )
          //    }
          //    // else {
             //   console.log('Not liked', card.name);
             //   cardsListSection.addItem(createCard({
             //     name: `${card.name}`,
             //     link: `${card.link}`,
             //     id: `${card._id}`,
             //     likes: `${card.likes.length}`,
             //     isLikedByMe: false
             //   }))
          //    // };
          //   })
          //   // if (isLikedByMe) {console.log(card, card.likes);}
          //  // console.log(card.name, card.likes);
          // })
        })
    })
}




  // Promise.all(conditions)
  //   .then((results) => {
  //     results[0].forEach((element) => {
  //       element.likes.forEach((like) => {
  //         if (like._id === results[1]._id) {
  //           console.log(like._id, element.name)
  //           cardsListSection.addItem(createCard({
  //             name: `${element.name}`,
  //             link: `${element.link}`,
  //             id: `${element._id}`,
  //             likes: `${element.likes.length}`,
  //             isLikedByMe: true
  //           }))}
  //       })
  //
  //
  //     })
  //   })
  //   .catch((err) => {console.log(`Произошла ошибка ${err}`)});




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



//
// function  getCardLikes1() {
//   api.getInitialCards()
//     .then((answer) => console.log(answer))
// }
// getCardLikes1();


// function isLikedByMe(cardID) {
//
//   api.getInitialCards()
//     .then((answer) => {
//       answer
//         .forEach((element) => {
//           if (element._id === cardID) {
//             return (element.likes)
//           }
//         })
//     })
//     .then((likes).forEach)
// }
//
// getCardLikes('6070502b4d6c210078d54f03');
//
// function isLikedByMe(cardID) {
//   console.log(getCardLikes(cardID))
// }
//
// isLikedByMe('6070502b4d6c210078d54f03');

// api.setCardLike('60704a464d6c210078d54ee0')
//   .then((answer) => console.log(answer))
//   .catch((err) => console.log(err));


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
    }
  );
  return card.create();
}



// Добавляем обработчики кнопок "Редактировать профиль" и "Добавление карточки"
profileEditButton.addEventListener('click', handleProfileEditOpen);
cardAddButton.addEventListener('click', handleCardAddOpen);

// // Добавляем изначальный список карточек в разметку
// cardsListSection.addAllItems();
