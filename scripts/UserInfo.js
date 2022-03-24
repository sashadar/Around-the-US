class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._name = this._nameElement.textContent;
    this._jobElement = document.querySelector(jobSelector);
    this._job = this._jobElement.textContent;
  }

  getUserInfo() {
    this._userInfo = { name: this._name, job: this._job };

    return this._userInfo;
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}

export default UserInfo;
