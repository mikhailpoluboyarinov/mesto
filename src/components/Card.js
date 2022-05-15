export class Card {
    constructor({data, handleRemoveButtonClick, handleLikeButtonClick}, templateSelector, openImagePopup) {
        this._handleRemoveButtonClick = handleRemoveButtonClick;
        this._handleLikeButtonClick  = handleLikeButtonClick;
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
            this._likeButton.addEventListener('click', () => {
            this._handleLikeButtonClick(this._likeButton.classList.contains('element__like-button_active'));
        })
    }

    _handleClickRemoveButton() {
        const deleteButton = this._element.querySelector('.element__delete-button');

        deleteButton.addEventListener('click', () => {
            this._handleRemoveButtonClick();
        });
    }

    toggleLikeButton() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    setLIkeCount(count) {
        this._likesCount.textContent = count;
    }

    removeCard() {
        this._element.remove();
    }

    _setEventListeners() {
        if (this._data.withRemoveButton) {
            this._handleClickRemoveButton();
        }

        this._handleClickLikeToggle();

        this._handleClickImage();
    }

    renderCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._likesCount = this._element.querySelector('.element__likes-count');
        this._likeButton = this._element.querySelector('.element__like-button');

        const elementTitle = this._element.querySelector('.element__title');
        const elementDelete = this._element.querySelector('.element__delete-button');

        if (this._data.isLiked) {
            this._likeButton.classList.add('element__like-button_active');
        }

        const {name, link, likesCount} = this._data;

        this._elementImage.src = link;
        this._elementImage.alt = name;

        this._likesCount.textContent = likesCount;
        elementTitle.alt = name;
        elementTitle.textContent = name;

        !this._data.withRemoveButton && elementDelete.remove();

        this._setEventListeners();

        return this._element;
    }
}