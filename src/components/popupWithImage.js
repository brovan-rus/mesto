import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupPhotoImage = this._popup.querySelector('.popup__photo');
    this._popupPhotoTitle = this._popup.querySelector('.popup__title_content_photo')
    super.setEventListeners()
  }

  open({link, name}) {
    this._popupPhotoImage.src = link;
    this._popupPhotoImage.alt = name;
    this._popupPhotoTitle.textContent = name;
    super.open();
  }
}
