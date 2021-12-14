let editPopup = document.querySelector('.profile__edit-button');
let closeForm = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_profession');
let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}

editPopup.addEventListener('click', openPopup);
closeForm.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);