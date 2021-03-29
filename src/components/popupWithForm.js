import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._popupForm = document.querySelector(popupSelector).querySelector('.form');
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.setEventListeners();
  }

  form() {
    return (this._popupForm);
  }

  _getInputValues(form) {
    const values = Array.from(form.querySelectorAll('.form__input'))
      .map(({value}) => {
        return value
      });
    const keys = Array.from(form.querySelectorAll('.form__input'))
      .map(({name}) => {
        return name
      });
    const inputValues = {}
    keys.forEach((element, i) => {
      inputValues[element] = values[i]
    })
    return inputValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues(this._popupForm);
    this._submit(inputValues);
    this.close();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
    super.setEventListeners();
  }
}
