const cardsSelector = '.elements';
const popupEditSelector = '.popup_edit';
const popupAddSelector = '.popup_add';
const popupPhotoSelector = '.popup_photo';
const userNameSelector = '.profile__title';
const userInfoSelector = '.profile__subtitle';
const templateSelector = '#template-element';

const popupBtnEdit = document.querySelector('.profile__edit-button');
const popupBtnAdd = document.querySelector('.profile__add-button');
const formEditElement = document.querySelector('.form_edit');
const formAddCard = document.querySelector('.form_add_card');

//Объект настроек валидации
const options = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

export {
    cardsSelector,
    popupEditSelector,
    popupAddSelector,
    popupPhotoSelector,
    userNameSelector,
    userInfoSelector,
    templateSelector,
    popupBtnEdit,
    popupBtnAdd,
    formEditElement,
    formAddCard,
    options
};