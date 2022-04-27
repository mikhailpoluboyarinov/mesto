import {openPopup} from "./utils.js";

export class Card {
    constructor(data, templateElement) {
        this._data = data;
        this._templateElement = templateElement;
    }

    _getTemplate() {
        return this._templateElement.content.querySelector('.element').cloneNode(true);
    }

    _handleClickImage() {
        const element = this._element;
        const elementImage = element.querySelector('.element__image');
        const {name, link} = this._data;
        const popupPhoto = document.querySelector('.popup_photo');
        const photo = popupPhoto.querySelector('.popup__image');
        const title = popupPhoto.querySelector('.popup__title');

        elementImage.addEventListener('click', function () {
            photo.src = link;
            photo.alt = name;
            title.textContent = name;
            openPopup(popupPhoto);
        });
    }

    _handleClickLikeToggle() {
        const element = this._element;
        const likeButton = element.querySelector('.element__like-button');

        likeButton.addEventListener('click', function () {
            likeButton.classList.toggle('element__like-button_active');
        });
    }

    _handleClickRemoveButton() {
        const element = this._element;
        const deleteButton = element.querySelector('.element__delete-button');

        deleteButton.addEventListener('click', function () {
            element.remove();
        });
    }

    _setEventListeners() {
        this._handleClickRemoveButton();

        this._handleClickLikeToggle();

        this._handleClickImage();
    }

    renderCard() {
        this._element = this._getTemplate();

        const elementImage = this._element.querySelector('.element__image');
        const elementTitle = this._element.querySelector('.element__title');
        const {name, link} = this._data;

        elementImage.src = link;
        elementTitle.alt = name;
        elementTitle.textContent = name;

        this._setEventListeners();

        return this._element;
    }
}