export class FormValidator {
    constructor (options, formElement) {
        this._options = options;
        this._formElement = formElement;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
        const checkInputValidity = this._checkInputValidity.bind(this);
        const toggleButtonState = this._toggleButtonState.bind(this);
        const options = this._options;

        toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(inputElement);
                toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
            });
        });
    }

    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._options.inputErrorClass);
        errorElement.classList.add(this._options.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = '';
    }
}