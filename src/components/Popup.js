export default class Popup {
    #popup;
    #buttonClose;

    constructor (selector) {
        this.#popup = document.querySelector(selector);
    }

    #handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close(this.#popup);
             console.log('попап закрылся')
        }
    }

    open() {
        this.#popup.classList.add('popup_opened', 'appearance');
        this.#popup.classList.remove('hiding');
        document.addEventListener('keydown', this.#handleEscClose);
        this.setEventListeners();
    }

    close() {
        this.#popup.classList.remove('popup_opened', 'appearance');
        this.#popup.classList.add('hiding');
        document.removeEventListener('keydown', this.#handleEscClose);
    }

    setEventListeners() {
        this.#buttonClose = this.#popup.querySelector('.popup__close');
        this.#buttonClose.addEventListener('click', () => this.close(this.#popup))

        this.#popup.addEventListener('click', (evt) => {
          if (evt.target === this.#popup) {
            this.close(this.#popup);
          } 
        });
    }
}