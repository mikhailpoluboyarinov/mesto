const editPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit');
const addPopupBtn = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_add');
const closeForm = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
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

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


//Функция открытия попапа

function openPopup() {
    popup.classList.add('popup_opened');
}


//Функция закрытия попапа

function closePopup() {
    popup.classList.remove('popup_opened');
}


//Функция открытия попапа профиля

function editProfile() {
    openPopup(editPopup);
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}


//Функция закрытия попапа профиля

function closeProfile() {
    closePopup(editPopup);
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


//Функция закрытия попапа добавления карточек

function closeAddCard() {
    closePopup(addPopup);
}


//Функкия сохранения данных карточки

function AddCard(evt) {
    evt.preventDefault();
    const cardName = popupPlace.value;
    const cardLink = popupLink.value;
    cards.prepend(createNewCard(cardName, cardLink));
    closePopup(addPopup);
}


//Функция создания,удаления карточки + лайк + открытие картинки

function createNewCard(nameValue, linkValue) {
    const elementCard = itemTemplate.content.querySelector('.element').cloneNode(true);
    const elementImage = elementCard.querySelector('.element__image');
    const elementTitle = elementCard.querySelector('.element__title');
    const like = elementCard.querySelector('.element__like-button')

    elementImage.src = linkValue;
    elementTitle.alt = nameValue;
    elementTitle.textContent = nameValue;

    elementCard.querySelector('.element__delete-button').addEventListener('click', function () {
        elementCard.remove();
    });

   like.addEventListener('click', function () {
        like.classList.toggle('element__like-button_active');
    });

   elementImage.addEventListener('click', function () {
        popupPhoto.querySelector('.popup__image').src = linkValue;
        popupPhoto.querySelector('.popup__image').alt = nameValue;
        popupPhoto.querySelector('.popup__title').textContent = nameValue;
        openPopup(popupPhoto);
   });

   return elementCard;
}


//Функция добавления карточек при загрузке страницы

initialCards.forEach((item) => {
    const createCard = createNewCard(item.nameValue, item.linkValue);
    cards.prepend(createCard);
})

//События

editPopupBtn.addEventListener('click', editProfile);
closeForm.addEventListener('click', closeProfile);
formElement.addEventListener('submit', formSubmitHandler);
addPopupBtn.addEventListener('click', openAddCard);
closeForm.addEventListener('click', closeAddCard);
addPopup.addEventListener('submit', AddCard);
