export class Card {
    #data;
    #delCard;
    #popupOpenImg;
    #buttonLike;
    #todoElement;
    #templateSelector;
    #handleClickDelete;
    #handleClickEdit;
    #handleClickLike;

    #getTemplate() {
        return document
        .querySelector(this.#templateSelector)
        .content.querySelector('.element')
        .cloneNode(true);
    }

    constructor({data, handleClickDelete, handleClickEdit, handleClickLike}, templateSelector) {
        this.#data = data;
        this.#templateSelector = templateSelector;
        this.#handleClickDelete = handleClickDelete;
        this.#handleClickEdit = handleClickEdit;
        this.#handleClickLike = handleClickLike;
    };

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