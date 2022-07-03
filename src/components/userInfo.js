export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  setAvatarInfo(avatar) {
    this._avatar.src = avatar;
  }
}
