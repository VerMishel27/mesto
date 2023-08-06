export default class Card {
    #data;
    #delCard;
    #popupOpenImg;
    #buttonLike;
    #todoElement;
    #templateSelector;
    #handleClickEdit;

    #getTemplate() {
        return document
        .querySelector(this.#templateSelector)
        .content.querySelector('.element')
        .cloneNode(true);
    }

    constructor(data, handleClickEdit, templateSelector) {
        this.#data = data;
        this.#templateSelector = templateSelector;
        this.#handleClickEdit = handleClickEdit;
    };

    #handleClickDelete(todoElement) {
        todoElement.remove();
    }

    #handleClickLike(todoLike) {
        todoLike.classList.toggle('element__like_active');
    }

    #setEventListeners () {
        this.#delCard.addEventListener('click', () => this.#handleClickDelete(this.#todoElement));
      
        this.#buttonLike.addEventListener('click', () => this.#handleClickLike(this.#buttonLike));
      
        this.#popupOpenImg.addEventListener('click', () =>  this.#handleClickEdit(this.#data));
    }

    createCard() {
        this.#todoElement = this.#getTemplate();
        const imgElement = this.#todoElement.querySelector('.element__mask-group');
        const nameElement = this.#todoElement.querySelector('.element__title');
        this.#delCard = this.#todoElement.querySelector('.element__del-card');
        this.#buttonLike = this.#todoElement.querySelector('.element__like');
        this.#popupOpenImg = this.#todoElement.querySelector('.element__img-button');
      
        nameElement.textContent = this.#data.name;
        imgElement.src = this.#data.link;
        imgElement.alt = this.#data.name;

        this.#setEventListeners();
      
        return this.#todoElement;
      };
}