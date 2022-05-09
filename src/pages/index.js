import {
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
} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {initialCards} from '../utils/cards.js';
import {UserInfo} from '../components/UserInfo.js';
import './index.css';

const profileValidation = new FormValidator(options, formEditElement);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(options, formAddCard);
newCardValidation.enableValidation();

//Функция создания карточки
const createCard = (item) => {
    const cardItem = new Card(item, templateSelector, openImagePopup);
    return cardItem.renderCard();
}

//Функция добавления карточек при загрузке страницы
const cardSection = new Section({ items: initialCards, renderer: (data) => {
    const card = createCard(data);
    cardSection.addItem(card);
    }},
    cardsSelector);
cardSection.render();

const userInfo = new UserInfo({ dataUserNameSelector: userNameSelector, dataUserInfoSelector: userInfoSelector } );

const popupUserInfo = new PopupWithForm(popupEditSelector, submitHandlerForm);
popupUserInfo.setEventListeners();

function editProfile() {
    popupUserInfo.open();

    const userInfoData = userInfo.getUserInfo();

    popupUserInfo.setInputValues(userInfoData);
    profileValidation.checkValidity();
}

//Функция сохранения данных профиля
function submitHandlerForm (data) {
     userInfo.setUserInfo(data);
     popupUserInfo.close();
}

const popupAddPlace = new PopupWithForm(popupAddSelector, addCard);
popupAddPlace.setEventListeners();

//Функция открытия попапа добавления карточек
function openAddCard() {
    newCardValidation.reset();
    popupAddPlace.open();
}

//Функция сохранения данных карточки
function addCard(data) {
    const cardData = {
        name: data['name-of-place'],
        link: data.link
    };
    const newCard = createCard(cardData);
    cardSection.addItem(newCard);
    popupAddPlace.close();
    popupAddPlace.reset();
}

const popupImage = new PopupWithImage(popupPhotoSelector);
popupImage.setEventListeners();

function openImagePopup (data) {
    popupImage.open(data);
}

//События
popupBtnEdit.addEventListener('click', editProfile);
popupBtnAdd.addEventListener('click', openAddCard);