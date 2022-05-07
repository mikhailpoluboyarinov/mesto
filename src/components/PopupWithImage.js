import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._popupImage = this._element.querySelector('.popup__image');
        this._popupTitle = this._element.querySelector('.popup__title');

        this.setEventListeners();
    }

    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupTitle.textContent = data.name;

        super.open();
    }
}