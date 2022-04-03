class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const name = this._nameElement.textContent;
    const job = this._jobElement.textContent;
    const avatar = this._avatarElement.src;
    const userInfo = { name: name, job: job, avatar: avatar };

    return userInfo;
  }

  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.src = avatar;
  }
}

export default UserInfo;
