let popupWindow = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container form');
let submitButton = formElement.querySelector('.popup__submit-button');
let formName = formElement.querySelector('.popup__form-field_info_name');
let formJob = formElement.querySelector('.popup__form-field_info_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function openPopup(){
  formName.value=profileName.textContent;
  formJob.value=profileJob.textContent;
  popupWindow.classList.add('popup_opened');
}
function closePopup(){
  popupWindow.classList.remove('popup_opened');
}
function formSubmit(evt){
  evt.preventDefault();
  profileName.textContent=formName.value;
  profileJob.textContent=formJob.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmit);

