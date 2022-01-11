const editPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit');
const addPopupBtn = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_add');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_profession');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const itemTemplate = document.querySelector('#template-element');
const cards = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_photo');
const popupPlace = document.querySelector('.form__input_type_place');
const popupLink = document.querySelector('.form__input_type_link');
const photo = popupPhoto.querySelector('.popup__image');
const title = popupPhoto.querySelector('.popup__title');
const popups = document.querySelectorAll('.popup');
const submitButton = document.querySelector('.popup__button_add');


//Функция открытия попапа

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}


//Функция закрытия попапа

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}


//Функция закрытия попапа по Esc

const closePopupByEsc = function (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}


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


//Функкия сохранения данных карточки

function addCard(evt) {
    evt.preventDefault();
    const card = {
        name: popupPlace.value,
        link: popupLink.value
    };
    cards.prepend(createNewCard(card));
    closePopup(addPopup);
    popupPlace.value = '';
    popupLink.value = '';
}


//Функция создания,удаления карточки + лайк + открытие картинки

function createNewCard(item) {
    const { name, link } = item;
    const elementCard = itemTemplate.content.querySelector('.element').cloneNode(true);
    const elementImage = elementCard.querySelector('.element__image');
    const elementTitle = elementCard.querySelector('.element__title');
    const like = elementCard.querySelector('.element__like-button');

    elementImage.src = link;
    elementTitle.alt = name;
    elementTitle.textContent = name;

    elementCard.querySelector('.element__delete-button').addEventListener('click', function () {
        elementCard.remove();
    });

    like.addEventListener('click', function () {
        like.classList.toggle('element__like-button_active');
    });

    elementImage.addEventListener('click', function () {
        photo.src = link;
        photo.alt = name;
        title.textContent = name;
        openPopup(popupPhoto);
    });

    return elementCard;
}


//Функция добавления карточек при загрузке страницы

initialCards.forEach((item) => {
    cards.prepend(createNewCard(item));
})


//События

editPopupBtn.addEventListener('click', editProfile);
formElement.addEventListener('submit', submitHandlerForm);
addPopupBtn.addEventListener('click', openAddCard);
addPopup.addEventListener('submit', addCard);