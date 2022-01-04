const editPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit');
const editPopupCloseBtn = editPopup.querySelector('.popup__close-button')
const addPopupBtn = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_add');
const addPopupCloseBtn = addPopup.querySelector('.popup__close-button');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_profession');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const itemTemplate = document.querySelector('#template-element');
const cards = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoCloseBtn = popupPhoto.querySelector('.popup__close-button');
const popupPlace = document.querySelector('.form__input_type_place');
const popupLink = document.querySelector('.form__input_type_link');



//Функция открытия попапа

function openPopup(popup) {
    popup.classList.add('popup_opened');
}


//Функция закрытия попапа

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


//Функция открытия попапа профиля

function editProfile() {
    openPopup(editPopup);
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}


//Функция сохранения данных профиля

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(editPopup);
}


//Функция открытия попапа добавления карточек

function openAddCard() {
    openPopup(addPopup);
    popupPlace.value = '';
    popupLink.value = '';
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
}


//Функция создания,удаления карточки + лайк + открытие картинки

function createNewCard(item) {
    const { name, link } = item;
    const elementCard = itemTemplate.content.querySelector('.element').cloneNode(true);
    const elementImage = elementCard.querySelector('.element__image');
    const elementTitle = elementCard.querySelector('.element__title');
    const like = elementCard.querySelector('.element__like-button');
    const photo = popupPhoto.querySelector('.popup__image');
    const title = popupPhoto.querySelector('.popup__title');

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
formElement.addEventListener('submit', formSubmitHandler);
addPopupBtn.addEventListener('click', openAddCard);
addPopup.addEventListener('submit', addCard);
editPopupCloseBtn.addEventListener('click', function () {
    closePopup(editPopup);
})
addPopupCloseBtn.addEventListener('click', function () {
    closePopup(addPopup);
})
popupPhotoCloseBtn.addEventListener('click', function () {
    closePopup(popupPhoto);
})