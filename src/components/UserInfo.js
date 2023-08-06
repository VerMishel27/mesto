export default class UserInfo {
    #name;
    #job;

    constructor(name, job) {
       this.#name = name;
       this.#job = job;
    }

    getUserInfo(nameInput, jobInput) {
        nameInput.value = this.#name.textContent;
        jobInput.value = this.#job.textContent;

        return nameInput, jobInput;
    }

    setUserInfo(nameInput, jobInput) {
        this.#name.textContent = nameInput;
        this.#job.textContent = jobInput;
    }
}