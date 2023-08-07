import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    #popupForm;
    #callbackSumbitForm;
    #formInputList;
    #formValue;
    #selector;


    constructor(selector, callbackSumbitForm) {
        super(selector);
        this.#selector = document.querySelector(selector);
        this.#callbackSumbitForm = callbackSumbitForm;
        this.#popupForm = this.#selector.querySelector('.popup__form');
        this.#formInputList = this.#popupForm.querySelectorAll('.popup__field');
    }

    #getInputValues() {
        this.#formValue = {};
        this.#formInputList.forEach(input => {
            this.#formValue[input.name] = input.value;
        })
        return this.#formValue;
    }

    setEventListeners() {
        super.setEventListeners();
        this.#popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.#callbackSumbitForm(this.#getInputValues());
        })
    }

    close() {
        super.close();
        this.#popupForm.reset();
    }
}