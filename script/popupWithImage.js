import Popup from './popup.js';
import {popupPhotoTitle} from "./constants";
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
    popupPhotoImage.src = this._link;
    popupPhotoImage.alt = this._name;
    popupPhotoTitle.textContent = this.name;
    super.setEventListeners()
    super.open();
  }
}
