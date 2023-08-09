import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    #popupImage;
    #popupCaption;

    constructor(selector) {
        super(selector);
       
        this.#popupImage = this._popup.querySelector('.popup__img');
        this.#popupCaption = this._popup.querySelector('.popup__subtitle');
    }

    open(dataTodo) {
        this.#popupImage.src = dataTodo.link;
        this.#popupImage.alt = dataTodo.name;
        this.#popupCaption.textContent = dataTodo.name;
        super.open();
    }
}