export class Card {
    constructor(data, templateSelector, openImagePopup) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._openImagePopup = openImagePopup;
    }

    _getTemplate() {
        const itemTemplate = document.querySelector(this._templateSelector);

        return itemTemplate.content.querySelector('.element').cloneNode(true);
    }

    _handleClickImage() {
        this._elementImage.addEventListener('click', () => {
            this._openImagePopup(this._data);
        });
    }

    _handleClickLikeToggle() {
        const likeButton = this._element.querySelector('.element__like-button');

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('element__like-button_active');
        });
    }

    _handleClickRemoveButton() {
        const deleteButton = this._element.querySelector('.element__delete-button');

        deleteButton.addEventListener('click', () => {
            this._element.remove();
        });
    }

    _setEventListeners() {
        this._handleClickRemoveButton();

        this._handleClickLikeToggle();

        this._handleClickImage();
    }

    renderCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');

        const elementTitle = this._element.querySelector('.element__title');
        const {name, link} = this._data;

        this._elementImage.src = link;
        elementTitle.alt = name;
        elementTitle.textContent = name;

        this._setEventListeners();

        return this._element;
    }
}