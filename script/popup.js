import {closeKey} from "./constants.js";

export default class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open(){
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close(){
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleClosePopupButton(evt) {
    if (evt.target.classList.contains('popup__close-button')) {this.close()}
    }

  _closeOnOverlay(evt) {
    if (evt.currentTarget === evt.target) {this.close()}
  }

  _closeOnEscape(evt) {
    if (evt.key === closeKey) {this.close()}
    }

  setEventListeners(){
    this._popup.closest('body').addEventListener('keydown', this._closeOnEscape.bind(this));
    this._popup.addEventListener('click', this._closeOnOverlay.bind(this));
    this._popup.addEventListener('click', this._handleClosePopupButton.bind(this));
    }

  _removeEventListeners() {
    this._popup.closest('body').removeEventListener('keydown', this._closeOnEscape.bind(this));
    this._popup.removeEventListener('click', this._closeOnOverlay);
    this._popup.removeEventListener('click', this._handleClosePopupButton);
  }
}
