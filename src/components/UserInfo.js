export class UserInfo {
    constructor( { dataUserNameSelector, dataUserInfoSelector, dataUserAvatarSelector } ) {
        this._userNameELement = document.querySelector(dataUserNameSelector);
        this._userInfoElement = document.querySelector(dataUserInfoSelector);
        this._userAvatarElement = document.querySelector(dataUserAvatarSelector);
    }

    getUserInfo () {
        return {
            name: this._userNameELement.textContent,
            profession: this._userInfoElement.textContent
        };
    }

    setUserInfo(data) {
        this._userNameELement.textContent = data.name;
        this._userInfoElement.textContent = data.profession;
        this._userAvatarElement.src = data.avatar;
    }

    getUserId() {
        return this._userId;
    }

    setUserId(id) {
        this._userId = id;
    }

    setAvatar(avatar) {
        this._userAvatarElement.src = avatar;
    }
}