import Popup from './popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._popupForm = document.querySelector(popupSelector).querySelector('form');
  }

  _getInputValues() {
    const values = Array.from(this._popupForm.querySelectorAll('.form__input'))
      .map(({value}) => {
        return value
      });
    const keys = Array.from(this._popupForm.querySelectorAll('.form__input'))
      .map(({name}) => {
        return name
      });
    const inputValues = {}
    keys.forEach((element, i) => {inputValues[element] = values[i]})
    return inputValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
    this.close();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._handleFormSubmit.bind(this));
    super.setEventListeners();
  }
}
