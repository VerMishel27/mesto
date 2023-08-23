import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    #popupForm;
    #callbackSumbitForm;
    #formInputList;
    #formValue;  
    #buttonFormSave;
    _saveLoading;

    constructor(selector, callbackSumbitForm, saveLoading) {
        super(selector);
      
        this.#callbackSumbitForm = callbackSumbitForm;
        this.#popupForm = this._popup.querySelector('.popup__form');
        this.#formInputList = this.#popupForm.querySelectorAll('.popup__field');
        this.#buttonFormSave = this._popup.querySelector('.popup__submit-button');
        this._saveLoading = saveLoading;
    }

    #getInputValues() {
        this.#formValue = {};
        this.#formInputList.forEach(input => {
            this.#formValue[input.name] = input.value;
        })
        
        return this.#formValue;
    }

    setEventListeners() {
        super._setEventListeners();
        this.#popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._saveLoading(true, this.#buttonFormSave)
            this.#callbackSumbitForm(this.#getInputValues(), this.#buttonFormSave);
        })
    }

    open() {
        super.open()
    }

    close() {
        super.close();
        this.#popupForm.reset();
    }
}