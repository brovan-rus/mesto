import Popup from './popup';

export default class PopupWithOneButton extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupButton = this._popup.querySelector('.popup__approve-button');
    this._deleteCard = deleteCard;
    this._cardID = '';
    this._evt = '';
    this._handleButtonClick = this._handleButtonClick.bind(this)
    this._setEventListeners();
  }

  open(cardID, evt) {
    this._evt = evt;
    this._cardID = cardID;
    super.open();
  }

  _handleButtonClick() {
    this._deleteCard(this._cardID, this._evt);
    super.close();
  }

  _setEventListeners() {
    this._popupButton.addEventListener('click', this._handleButtonClick)
    super.setEventListeners();
  }

}
