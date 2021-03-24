import {openPopup} from './utils.js';
import {popupPhoto, popupPhotoImage, popupPhotoTitle} from "./constants.js";

export default class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  // Публичный метод создания карточки.
  create() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode('true');
    cardTemplate.querySelector('.card__title').textContent = this._data.name;
    const cardImage = cardTemplate.querySelector('.card__image');
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._addCardListeners(cardTemplate, cardImage);
    return cardTemplate;
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
    popupPhotoImage.src = data.link;
    popupPhotoImage.alt = data.name;
    popupPhotoTitle.textContent = data.name;
    openPopup(popupPhoto);
  }

  // Добавление слушателей
  _addCardListeners(cardTemplate, cardImage) {
    cardImage.addEventListener('click', () => this._handlePreviewPicture(this._data));
    const delButton = cardTemplate.querySelector('.card__trash-button');
    delButton.addEventListener('click', this._handleDeleteCard);
    const likeButton = cardTemplate.querySelector('.card__like-button');
    likeButton.addEventListener('click', this._handleLikeCard);
  }

}
