import {closeKey} from "./constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeOnEscape = this._closeOnEscape.bind(this);
    this._closeOnOverlay = this._closeOnOverlay.bind(this);
    this._handleClosePopupButton = this._handleClosePopupButton.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeOnEscape);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeOnEscape);

  }

  _handleClosePopupButton(evt) {
    if (evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  _closeOnOverlay(evt) {
    if (evt.currentTarget === evt.target) {
      this.close()
    }
  }

  _closeOnEscape(evt) {
    if (evt.key === closeKey) {
      this.close()
    }
  }

  setEventListeners(popup) {
    this._popup.addEventListener('click', this._closeOnOverlay);
    this._popup.addEventListener('click', this._handleClosePopupButton);
  }

  // _removeEventListeners() {
  //   this._popup.removeEventListener('click', this._closeOnOverlay);
  //   this._popup.removeEventListener('click', this._handleClosePopupButton);
  // }
}
