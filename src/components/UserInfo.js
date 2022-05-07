export class UserInfo {
    constructor( { dataUserNameSelector, dataUserInfoSelector } ) {
        this._userNameELement = document.querySelector(dataUserNameSelector);
        this._userInfoElement = document.querySelector(dataUserInfoSelector);
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
    }
}