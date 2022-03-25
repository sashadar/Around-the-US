class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);

    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._name = this._nameElement.textContent;
    this._job = this._jobElement.textContent;
    this._userInfo = { name: this._name, job: this._job };

    return this._userInfo;
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}

export default UserInfo;
