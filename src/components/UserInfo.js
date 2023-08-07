export default class UserInfo {
    name;
    job;

    constructor(name, job) {
       this.name = document.querySelector(name);
       this.job = document.querySelector(job);
    }

    getUserInfo() {
        const userProfileInfo = {
            userName: this.name.textContent,
            userJob: this.job.textContent
        };

        return userProfileInfo;
    }

    setUserInfo(nameInput, jobInput) {
        this.name.textContent = nameInput;
        this.job.textContent = jobInput;
    }
}