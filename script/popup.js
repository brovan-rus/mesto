import {FormValidator} from './formValidator.js';
import {validationValues} from './initilize.js';

export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._form = popup.querySelector('.form');
    if (this._form) {
      this._formValidator = new FormValidator(validationValues, this._form)
    }
    this._closeOnEscape = this._closeOnEscape.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    this._addPopupEventListeners();
    if (this._form) {
      this._formValidator.enableValidation()
    }
  }

  _resetForm() {
    const _popupForm = this._popup.querySelector('.form');
    _popupForm.reset();
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    this._removePopupEventListeners();
    // Если в попапе есть форма - сбросим ее при закрытии окна.
    if (this._popup.querySelector('.form')) {
      this._resetForm();
    }
  }

  _handleClosePopupButton(evt) {
    if (evt.target.classList.contains('popup__close-button')) {
      this.closePopup();
    }
  }

  _closeOnOverlay(evt) {
    if (evt.currentTarget === evt.target) {
      this.closePopup();
    }
  }

  _closeOnEscape(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _addPopupEventListeners() {
    this._popup.closest('body').addEventListener('keydown', this._closeOnEscape);
    this._popup.addEventListener('click', (evt) => this._closeOnOverlay(evt));
    this._popup.addEventListener('click', (evt) => this._handleClosePopupButton(evt));
  }

  _removePopupEventListeners() {
    this._popup.closest('body').removeEventListener('keydown', this._closeOnEscape);
    this._popup.removeEventListener('click', this._closeOnOverlay);
    this._popup.removeEventListener('click', this._handleClosePopupButton);
  }
}
