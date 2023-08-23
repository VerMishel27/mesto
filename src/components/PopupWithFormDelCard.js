import Popup from "./Popup";

export default class PopupWithFormDelCard extends Popup {
    #popupForm;
    #handleClickSumbit;
    #buttonSaveCard;
    #saveLoading

    constructor (selector, handleClickSumbit, saveLoading) {
        super(selector);
        this.#popupForm = this._popup.querySelector('.popup__form');
        this.#handleClickSumbit = handleClickSumbit;
        this.#buttonSaveCard = this._popup.querySelector('.popup__submit-button');
        this.#saveLoading = saveLoading;
    }

    setActionSumbit(calback) {
        this.#handleClickSumbit = calback;
    }

    getButtonSaveCard() {
        return this.#buttonSaveCard;
    }

    setEventListeners() {
        super._setEventListeners();

        this.#popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.#saveLoading(true, this.#buttonSaveCard)
            this.#handleClickSumbit();
        })
    }
}