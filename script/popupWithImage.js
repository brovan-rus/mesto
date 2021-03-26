import Popup from './popup.js';
import {popupPhotoTitle} from "./constants.js";
//import {popupPhoto, popupPhotoImage, popupPhotoTitle} from "./constants";
//import {openPopup} from "./utils";

export default class PopupWithImage extends Popup{
  constructor(popupSelector, {link, name}) {
    super(popupSelector);
    this._link = link;
    this._name = name;
    this._popup=document.querySelector(popupSelector);
  }

  open(){
    const popupPhotoImage = this._popup.querySelector('.popup__photo');
    const popupPhotoTitle = this._popup.querySelector('.popup__title_content_photo')
    popupPhotoImage.src = this._link;
    popupPhotoImage.alt = this._name;
    popupPhotoTitle.textContent = this._name;
    super.setEventListeners()
    super.open();
  }
}
