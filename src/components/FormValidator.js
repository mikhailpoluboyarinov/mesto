export class FormValidator {
    constructor (options, formElement) {
        this._options = options;
        this._formElement = formElement;
    }

    enableValidation() {
        this._buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));

        this._setEventListeners();
    }

    checkValidity() {
        this._inputList.forEach((inputElement) => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        })
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input',() => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _disableSubmit() {
        this._buttonElement.classList.add(this._options.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableSubmit() {
        this._buttonElement.classList.remove(this._options.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    reset() {
        this._disableSubmit();
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableSubmit();
        } else {
            this._enableSubmit();
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
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