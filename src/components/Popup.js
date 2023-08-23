export default class Popup {
    _popup;
    #buttonClose;

    constructor (selector) {
        this._popup = document.querySelector(selector);
    }

    #handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
             console.log('попап закрылся')
        }
    }

    open() {
        this._popup.classList.add('popup_opened', 'appearance');
        this._popup.classList.remove('hiding');
        document.addEventListener('keydown', this.#handleEscClose);
        this._setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened', 'appearance');
        this._popup.classList.add('hiding');
        document.removeEventListener('keydown', this.#handleEscClose);
    }

    _setEventListeners() {
        this.#buttonClose = this._popup.querySelector('.popup__close');
        this.#buttonClose.addEventListener('click', () => this.close(this._popup))

        this._popup.addEventListener('click', (evt) => {
          if (evt.target === this._popup) {
            this.close();
          } 
        });
    }
}