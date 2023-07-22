export class Card {
    #data;
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

    #setEventListeners (todoElement) {
        this.#handleClickDelete(todoElement);
    }

    createCard() {
        this.#todoElement = this.#getTemplate();
        const imgElement = this.#todoElement.querySelector('.element__mask-group');
        const nameElement = this.#todoElement.querySelector('.element__title');
        const delCard = this.#todoElement.querySelector('.element__del-card');
        this.#buttonLike = this.#todoElement.querySelector('.element__like');
        const popupOpenImg = this.#todoElement.querySelector('.element__img-button');
      
        nameElement.textContent = this.#data.name;
        imgElement.src = this.#data.link;
        imgElement.alt = this.#data.name;

        delCard.addEventListener('click', () => this.#setEventListeners(this.#todoElement));
      
        this.#buttonLike.addEventListener('click', () => this.#handleClickLike(this.#buttonLike));
      
        popupOpenImg.addEventListener('click', () =>  this.#handleClickEdit(this.#data));
      
        return this.#todoElement;
      };
}