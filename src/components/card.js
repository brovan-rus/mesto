export default class Card {
  constructor(data, templateSelector, handleCardClick, like) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._like = like;
  }

  // Публичный метод создания карточки.
  create() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode('true');
    cardTemplate.querySelector('.card__title').textContent = this._data.name;
    const cardImage = cardTemplate.querySelector('.card__image');
    const cardLikeCounter = cardTemplate.querySelector('.card__like-counter')
    const card = cardTemplate.querySelector('.card');
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    cardLikeCounter.textContent = this._data.likes;
    card.id = this._data.id;
    this._addCardListeners(cardTemplate, cardImage);
    return cardTemplate;
  }

  _handleCardLike(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }


  // Метод удаления карточки
  _handleDeleteCard(evt) {
    evt.target.closest('li').remove();
  }

  // Добавление слушателей
  _addCardListeners(cardTemplate, cardImage) {
    cardImage.addEventListener('click', () => this._handleCardClick(this._data));
    const delButton = cardTemplate.querySelector('.card__trash-button');
    delButton.addEventListener('click', this._handleDeleteCard);
    const likeButton = cardTemplate.querySelector('.card__like-button');
    likeButton.addEventListener('click', this._handleCardLike);
  }

}
