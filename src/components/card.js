export default class Card {
  constructor(data, templateSelector, handleOpenPopup, like, deleteCard) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
    this._like = like;
    this._handleCardLike = this._handleCardLike.bind(this);
    this._handleDeleteCard = this._handleDeleteCard.bind(this);
    this._deleteCard = deleteCard;
    this._cardID = data.id;
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode("true");
    this._card = this._cardTemplate.querySelector(".card");
    this._cardTitle = this._cardTemplate.querySelector(".card__title");
    this._cardLikeCounter = this._cardTemplate.querySelector(
      ".card__like-counter"
    );
    this._likeButton = this._cardTemplate.querySelector(".card__like-button");
    this._isLiked = data.isLikedByMe;
    this._delButton = this._cardTemplate.querySelector(".card__trash-button");
    this._owner = data.owner;
    this._cardImage = this._cardTemplate.querySelector(".card__image");
  }

  // Публичный метод создания карточки.
  create() {
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    this._cardLikeCounter.textContent = this._data.likes;
    this._card.id = this._data.id;
    if (!this._owner) {
      this._delButton.classList.add("card__trash-button_inactive");
    }
    this._addCardListeners(this._cardImage, this._data);
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
    return this._cardTemplate;
  }

  _handleCardLike() {
    this._like(this._cardID, this._isLiked);
  }

  renewLikeCounter(likes) {
    this._cardLikeCounter.textContent = likes;
    this._likeButton.classList.toggle("card__like-button_active");
    this._isLiked = !this._isLiked;
  }

  // Метод удаления карточки
  _handleDeleteCard(evt) {
    this._deleteCard(this._cardID, evt);
    //
  }

  // Добавление слушателей
  _addCardListeners() {
    this._cardImage.addEventListener("click", this._handleOpenPopup);
    //  const delButton = cardTemplate.querySelector('.card__trash-button');
    this._delButton.addEventListener("click", this._handleDeleteCard);
    // const likeButton = cardTemplate.querySelector('.card__like-button');
    this._likeButton.addEventListener("click", this._handleCardLike);
  }
}
