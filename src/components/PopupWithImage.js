import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    #selector;
    #popupImage;
    #popupCaption;

    constructor(selector) {
        super(selector);
        this.#selector = document.querySelector(selector);
        this.#popupImage = this.#selector.querySelector('.popup__img');
        this.#popupCaption = this.#selector.querySelector('.popup__subtitle');
    }

    open(dataTodo) {
        this.#popupImage.src = dataTodo.link;
        this.#popupImage.alt = dataTodo.name;
        this.#popupCaption.textContent = dataTodo.name;
        super.open();
    }
}