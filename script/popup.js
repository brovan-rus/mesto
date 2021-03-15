export class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    this._addPopupEventListeners();
  }

  _resetForm() {
    const _popupForm = this._popup.querySelector('.form');
    const _inputList = Array.from(_popupForm.querySelectorAll(validationValues.inputSelector));
    _inputList.forEach((element) => {
      hideInputError(_popupForm, element, validationValues.errorClass, validationValues.inputErrorClass);
    });
    _popupForm.reset();
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    this._removePopupEventListeners();
    // Если в попапе есть форма - сбросим ее при закрытии окна.
    if (this._popup.querySelector('.form')) {this._resetForm();}
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
    this._popup.addEventListener('keydown', (evt) => this._closeOnEscape(evt));
    this._popup.addEventListener('click', (evt) => this._closeOnOverlay(evt));
    this._popup.addEventListener('click', (evt) => this._handleClosePopupButton(evt));
  }

  _removePopupEventListeners() {
    this._popup.removeEventListener('keydown', this._closeOnEscape);
    this._popup.removeEventListener('click', this._closeOnOverlay);
    this._popup.removeEventListener('click', this._handleClosePopupButton);
  }
}
