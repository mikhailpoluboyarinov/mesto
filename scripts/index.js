import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from "./cards.js";
import {openPopup, closePopup} from "./utils.js";


const itemTemplate = document.querySelector('#template-element');
const cards = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_edit');
const submitButton = document.querySelector('.popup__button_add');
const editPopupBtn = document.querySelector('.profile__edit-button');
const addPopupBtn = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.form');
const addPopup = document.querySelector('.popup_add');
const popupPlace = document.querySelector('.form__input_type_place');
const popupLink = document.querySelector('.form__input_type_link');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_profession');


//Объект настроек валидации

const options = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}


//Функция добавления карточек при загрузке страницы

initialCards.forEach((item) => {
    const cardItem = new Card(item, itemTemplate);
    cards.prepend(cardItem.renderCard());
})


//Функция закрытия всех карточек по оверлею и крестику

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    })
})


//Функция открытия попапа профиля

function editProfile() {
    openPopup(editPopup);
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}


//Функция сохранения данных профиля

function submitHandlerForm (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(editPopup);
}


//Функция открытия попапа добавления карточек

function openAddCard() {
    submitButton.classList.add('popup__button_disabled');
    submitButton.setAttribute('disabled','disabled');
    openPopup(addPopup);
}


//Функция сохранения данных карточки

function addCard(evt) {
    evt.preventDefault();
    const card = {
        name: popupPlace.value,
        link: popupLink.value
    };

    const cardItem = new Card (card, itemTemplate);
    cards.prepend(cardItem.renderCard());


    closePopup(addPopup);
    popupPlace.value = '';
    popupLink.value = '';
}


const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
    const formValidator = new FormValidator(options, formElement);
    formValidator.enableValidation();
});


//События

editPopupBtn.addEventListener('click', editProfile);
formElement.addEventListener('submit', submitHandlerForm);
addPopupBtn.addEventListener('click', openAddCard);
addPopup.addEventListener('submit', addCard);