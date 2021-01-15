function openPopup(){
  let popupWindow = document.querySelector('.popup');
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');
  let formName = document.querySelector('.popup__form-name');
  let formJob = document.querySelector('.popup__form-job');
  formName.placeholder=profileName.textContent;
  formJob.placeholder=profileJob.textContent;
  popupWindow.classList.add('popup_opened');
}

function closePopup(){
  let popupWindow = document.querySelector('.popup');
  popupWindow.classList.remove('popup_opened');
}

function formSubmit(evt){
  evt.preventDefault();
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');
  let formName = document.querySelector('.popup__form-name');
  let formJob = document.querySelector('.popup__form-job');
  profileName.textContent=formName.value;
  profileJob.textContent=formJob.value;
}

//let profileName = document.querySelector('.profile__name');
//let profileJob = document.querySelector('.profile__job');

//let formName = document.querySelector('.popup__form-name');
//let formJob = document.querySelector('.popup__job-name');

let formElement = document.querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = formElement.querySelector('.popup__close-button');
let submitButton = formElement.querySelector('.popup__submit-button');


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
submitButton.addEventListener('click', formSubmit);

