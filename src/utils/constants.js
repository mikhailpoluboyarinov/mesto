const cardsSelector = '.elements';
const popupEditSelector = '.popup_edit';
const popupAddSelector = '.popup_add';
const popupPhotoSelector = '.popup_photo';
const popupAvatarSelector = '.popup_update-avatar';
const userNameSelector = '.profile__title';
const userInfoSelector = '.profile__subtitle';
const userAvatarSelector = '.profile__avatar'
const templateSelector = '#template-element';
const formConfirmDelete ='.popup_confirm';

const popupBtnEdit = document.querySelector('.profile__edit-button');
const popupBtnAdd = document.querySelector('.profile__add-button');
const formEditElement = document.querySelector('.form_edit');
const formAvatarElement = document.querySelector('.form_update_avatar');
const formAddCard = document.querySelector('.form_add_card');
const formAddAvatar = document.querySelector('.profile__avatar-container');

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
    popupAvatarSelector,
    userNameSelector,
    userInfoSelector,
    userAvatarSelector,
    templateSelector,
    popupBtnEdit,
    popupBtnAdd,
    formEditElement,
    formAvatarElement,
    formAddCard,
    formConfirmDelete,
    formAddAvatar,
    options
};