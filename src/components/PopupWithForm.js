import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, callbackSubmitForm) {
        super(selector);

        this._callbackSubmitForm = callbackSubmitForm;
        this._popupInputList = this._element.querySelectorAll('.popup__input');
        this._popupForm = this._element.querySelector('.popup__form');

        this.setEventListeners();
    }

    getInputValues() {
        this._inputValues = {};
        this._popupInputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        })

        return this._inputValues;
    }

    setInputValues(data) {
        this._popupInputList.forEach(input => {
            input.value = data[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this.getInputValues());
        })
    }

    close() {
        super.close();
    }

    reset() {
        this._popupForm.reset();
    }
}