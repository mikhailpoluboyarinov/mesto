import {
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
    formAvatarElement,
    formAddAvatar,
    formEditElement,
    formAddCard,
    formConfirmDelete,
    options,
} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithConfirm} from "../components/PopupWithConfirm";
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import './index.css';

const userInfo = new UserInfo({
    dataUserNameSelector: userNameSelector,
    dataUserInfoSelector: userInfoSelector,
    dataUserAvatarSelector: userAvatarSelector
} );

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
        authorization: 'd1839825-c30b-4093-8908-f23378961307',
        'Content-Type': 'application/json'
    }
});

const popupDelete = new PopupWithConfirm(formConfirmDelete);
popupDelete.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, handleSubmitEditAvatar);
popupEditAvatar.setEventListeners();

const popupImage = new PopupWithImage(popupPhotoSelector);
popupImage.setEventListeners();

const popupUserInfo = new PopupWithForm(popupEditSelector, submitHandlerForm);
popupUserInfo.setEventListeners();

const profileValidation = new FormValidator(options, formEditElement);
profileValidation.enableValidation();

const profileAvatarValidation = new FormValidator(options, formAvatarElement);
profileAvatarValidation.enableValidation();

const newCardValidation = new FormValidator(options, formAddCard);
newCardValidation.enableValidation();

//События
popupBtnEdit.addEventListener('click', editProfile);
formAddAvatar.addEventListener('click', () => {
    popupEditAvatar.setInitialSubmitText();
    popupEditAvatar.open()
});

function openImagePopup (data) {
    popupImage.open(data);
}

//Функция сохранения данных профиля
function submitHandlerForm (data) {
    popupUserInfo.setSubmitting();

    api.patchUserInfo({
        name: data.name,
        about: data.profession
    }).then(data => {
        popupUserInfo.setSubmitted();

        userInfo.setUserInfo({
            name: data.name,
            profession: data.about,
            avatar: data.avatar
        });

        popupUserInfo.close();
    }).catch((err) => {
        console.log(err);
    })
}

function mapCardData (cardData) {
    const userId = userInfo.getUserId();
    return {
        name: cardData.name,
        id: cardData._id,
        link: cardData.link,
        withRemoveButton: cardData.owner._id === userId,
        likesCount: cardData.likes.length,
        isLiked: Boolean(cardData.likes.find((item) => {
            return item._id === userId;
        }))
    };
}

function mapUserInfo (userInfoData) {
    return {
        name: userInfoData.name,
        profession: userInfoData.about,
        avatar: userInfoData.avatar
    }
}

function handleSubmitEditAvatar (values) {
    popupEditAvatar.setSubmitting();

    api.patchUserAvatar({ avatar: values.avatar }).then((data) => {
        popupEditAvatar.setSubmitted();

        userInfo.setAvatar(data.avatar);

        popupEditAvatar.close();
    }).catch((err) => {
        console.log(err);
    })
}

function editProfile() {
    popupUserInfo.setInitialSubmitText();
    popupUserInfo.open();

    const userInfoData = userInfo.getUserInfo();

    popupUserInfo.setInputValues(userInfoData);
    profileValidation.checkValidity();
}



//Функция создания карточки
const createCard = (cardData) => {

    function removeCard () {
        api.deleteCard(cardData.id).then(() => {
            popupDelete.close();
            cardItem.removeCard();
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleRemoveButtonClick () {
        popupDelete.setCallback(removeCard);
        popupDelete.open();
    }

    function callbackLikeBtnClick (data) {
        cardItem.toggleLikeButton();
        cardItem.setLIkeCount(data.likes.length);
    }

    function handleLikeButtonClick (isLiked) {
        if (isLiked) {
            api.deleteLike(cardData.id).then((data) => {
                callbackLikeBtnClick(data);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            api.putLike(cardData.id).then((data) => {
                callbackLikeBtnClick(data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const cardItem = new Card({ data: cardData, handleRemoveButtonClick, handleLikeButtonClick }, templateSelector, openImagePopup);

    return cardItem.renderCard();
}

//Функция добавления карточек при загрузке страницы
const cardSection = new Section((data) => {
        const card = createCard(data);
        cardSection.addItem(card);
    },
    cardsSelector
);


const popupAddPlace = new PopupWithForm(popupAddSelector, addCard);
popupAddPlace.setEventListeners();

//Функция сохранения данных карточки
function addCard(data) {
    const cardData = {
        name: data['name-of-place'],
        link: data.link
    };

    popupAddPlace.setSubmitting();

    api.postNewCard(cardData).then(data => {

        const preparedData = mapCardData(data);

        const newCard = createCard(preparedData);

        popupAddPlace.setSubmitted();

        cardSection.addItem(newCard);

        popupAddPlace.close();
        popupAddPlace.reset();
    }).catch((err) => {
        console.log(err);
    })
}

//Функция открытия попапа добавления карточек
function openAddCard() {
    newCardValidation.reset();
    popupAddPlace.setInitialSubmitText();
    popupAddPlace.open();
}

popupBtnAdd.addEventListener('click', openAddCard);


// загрузка данных для отрисовки страницы
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(data => {
    const userData = data[0];
    const cardsData = data[1];

    userInfo.setUserInfo(mapUserInfo(userData));
    userInfo.setUserId(userData._id);

    const preparedData = cardsData.map((cardData) => {
        return mapCardData(cardData);
    });

    cardSection.render(preparedData);
}).catch((err) => {
    console.log(err);
})