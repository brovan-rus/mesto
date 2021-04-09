export default class Card {
  constructor(data, templateSelector, handleCardClick, like) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._like = like;
    this._handleCardLike = this._handleCardLike.bind(this);
    this._cardID = data.id;
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode('true');
    this._cardLikeCounter = this._cardTemplate.querySelector('.card__like-counter');
    this._likeButton = this._cardTemplate.querySelector('.card__like-button');
    this._isLiked = data.isLikedByMe;
    this._delButton = this._cardTemplate.querySelector('.card__trash-button');
    this._owner = data.owner;


    // this._likeButton = this._cardTemplate.querySelector('.card__like-button');
    // this._delButton = this._cardTemplate.querySelector('.card__trash-button');
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
    const cardLikeCounter = this._cardTemplate.querySelector('.card__like-counter');
    if (!this._owner) {
      this._delButton.classList.add('card__trash-button_inactive')}
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    cardLikeCounter.textContent = this._data.likes;
    card.id = this._data.id;
    this._addCardListeners(this._cardTemplate, cardImage);

    if (this._isLiked) {
      this._likeButton.classList.add('card__like-button_active');
      return (this._cardTemplate)
    }
    return (this._cardTemplate);
  }

  _handleCardLike(evt) {
      this._like(this._cardID, this._isLiked);
    }


  renewLikeCounter(likes) {
    this._cardLikeCounter.textContent = likes;
    this._likeButton.classList.toggle('card__like-button_active');
    this._isLiked = ! this._isLiked;
  }


  // Метод удаления карточки
  _handleDeleteCard(evt) {
    evt.target.closest('li').remove();
  }

  // Добавление слушателей
  _addCardListeners(cardTemplate, cardImage) {
    cardImage.addEventListener('click', () => this._handleCardClick(this._data));
  //  const delButton = cardTemplate.querySelector('.card__trash-button');
    this._delButton.addEventListener('click', this._handleDeleteCard);
   // const likeButton = cardTemplate.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', this._handleCardLike);
  }

}
