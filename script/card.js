import {Popup} from './popup.js';

export class Card {
  constructor(data, templateSelector) {
    this._data=data;
    this._templateSelector=templateSelector;
  }

  // Публичный метод создания карточки.
  create() {
    const _cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode('true');
    _cardTemplate.querySelector('.card__title').textContent = this._data.name;
    const _cardImage = _cardTemplate.querySelector('.card__image');
    _cardImage.src=this._data.link;
    _cardImage.alt=this._data.name;
    this._addCardListeners(_cardTemplate, _cardImage);
    return _cardTemplate;
  }

  // Метод лайка карточки
   _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  // Метод удаления карточки
  _handleDeleteCard(evt) {
    evt.target.closest('li').remove();
  }

  _handlePreviewPicture(data) {
    const _popupPhoto = document.querySelector('.popup_content_photo');
    const _popupPhotoImage = _popupPhoto.querySelector('.popup__photo');
    const _popupPhotoTitle = _popupPhoto.querySelector('.popup__title_content_photo')
    _popupPhotoImage.src = data.link;
    _popupPhotoImage.alt = data.name;
    _popupPhotoTitle.textContent = data.name;
    new Popup(_popupPhoto).openPopup();
  }


  // Добавление слушателей
  _addCardListeners(cardTemplate, cardImage) {
    cardImage.addEventListener('click', () => this._handlePreviewPicture(this._data));
    const _delButton = cardTemplate.querySelector('.card__trash-button');
    _delButton.addEventListener('click', this._handleDeleteCard);
    const _likeButton = cardTemplate.querySelector('.card__like-button');
    _likeButton.addEventListener('click', this._handleLikeCard);
  }

}
