export default class Card {
  constructor(data, templateSelector, handleCardClick, like) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._like = like;
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode('true');
    this._cardLikeCounter = this._cardTemplate.querySelector('.card__like-counter')
    this._handleCardLike = this._handleCardLike.bind(this);
    this._likeButton = this._cardTemplate.querySelector('.card__like-button');
    this._delButton = this._cardTemplate.querySelector('.card__trash-button');
  }

  // Публичный метод создания карточки.
  create() {
    // const cardTemplate = document
    //   .querySelector(this._templateSelector)
    //   .content
    //   .cloneNode('true');
    this._cardTemplate.querySelector('.card__title').textContent = this._data.name;
    const cardImage = this._cardTemplate.querySelector('.card__image');
    const card = this._cardTemplate.querySelector('.card');
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._cardLikeCounter.textContent = this._data.likes;
    card.id = this._data.id;
    this._addCardListeners(this._cardTemplate, cardImage);

    if (this._data.isLikedByMe) {
      this._likeButton.classList.add('card__like-button_active');
      return (this._cardTemplate)};
    return (this._cardTemplate)


  }



  _handleCardLike() {
      this._like(this._data.id);
    }


  renewLikeCounter(likes) {
    this._cardLikeCounter.textContent = likes;
  }


  // Метод удаления карточки
  _handleDeleteCard(evt) {
    evt.target.closest('li').remove();
  }

  // Добавление слушателей
  _addCardListeners(cardTemplate, cardImage) {
    cardImage.addEventListener('click', () => this._handleCardClick(this._data));
    this._delButton.addEventListener('click', this._handleDeleteCard);
    this._likeButton.addEventListener('click', this._handleCardLike);
  }

}
