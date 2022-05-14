import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup{
    constructor(selector) {
        super(selector);

        this._confirmBtn = this._element.querySelector('.popup__confirm-button');
    }

    setEventListeners() {
        super.setEventListeners();

        this._confirmBtn.addEventListener('click', () => {
            this._callback();
        })
    }

    setCallback(callback) {
        this._callback = callback;
    }
}