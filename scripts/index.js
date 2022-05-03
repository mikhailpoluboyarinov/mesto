import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from "./cards.js";
import {openPopup, closePopup} from "./utils.js";


const templateSelector = '#template-element';
const cardsContainer = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const cardElementEdit = document.querySelector('.popup_edit');
const popupBtnEdit = document.querySelector('.profile__edit-button');
const popupBtnAdd = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.form');
const popupAddCard = document.querySelector('.popup_add');
const popupPlace = document.querySelector('.form__input_type_place');
const popupLink = document.querySelector('.form__input_type_link');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_profession');
const formEditElement = document.querySelector('.form_edit');
const formAddCard = document.querySelector('.form_add_card');
const popupPhoto = document.querySelector('.popup_photo');
const photo = popupPhoto.querySelector('.popup__image');
const title = popupPhoto.querySelector('.popup__title');


//Объект настроек валидации

const options = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}


const profileValidation = new FormValidator(options, formEditElement);
const newCardValidation = new FormValidator(options, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();


//Функция создания карточки

const createCard = (item) => {
    const cardItem = new Card(item, templateSelector, openImagePopup);
    return cardItem.renderCard();
}


//Функция добавления карточек при загрузке страницы

initialCards.forEach((item) => {
    cardsContainer.prepend(createCard(item));
})


//Функция закрытия всех карточек по оверлею и крестику

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    })
})


//Функция открытия попапа профиля

function editProfile() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
    openPopup(cardElementEdit);
}


function openImagePopup (data) {
    const { link, name } = data;

    photo.src = link;
    photo.alt = name;
    title.textContent = name;
    openPopup(popupPhoto);
}


//Функция сохранения данных профиля

function submitHandlerForm (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(cardElementEdit);
}


//Функция открытия попапа добавления карточек

function openAddCard() {
    newCardValidation.reset();
    openPopup(popupAddCard);
}


//Функция сохранения данных карточки

function addCard(evt) {
    evt.preventDefault();
    const card = {
        name: popupPlace.value,
        link: popupLink.value
    };


    cardsContainer.prepend(createCard(card));


    closePopup(popupAddCard);
    popupPlace.value = '';
    popupLink.value = '';
}


//События

popupBtnEdit.addEventListener('click', editProfile);
formElement.addEventListener('submit', submitHandlerForm);
popupBtnAdd.addEventListener('click', openAddCard);
popupAddCard.addEventListener('submit', addCard);