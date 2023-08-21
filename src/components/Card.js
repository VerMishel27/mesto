export default class Card {
    #data;
    #delCard;
    #popupOpenImg;
    #buttonLike;
    #todoElement;
    #templateSelector;
    #handleClickEdit;
    #handleClickDelete;
    #numberLike;
    #userInfoId;
    #handleClickLike;
    #likes;
    #dataOwnerId;

    #getTemplate() {
        return document
        .querySelector(this.#templateSelector)
        .content.querySelector('.element')
        .cloneNode(true);
    }

    constructor(data, handleClickEdit, handleClickDelete, handleClickLike, userInfo,  templateSelector) {
        this.#data = data;
        this.#templateSelector = templateSelector;
        this.#handleClickEdit = handleClickEdit;
        this.#handleClickDelete = handleClickDelete;
        this.#userInfoId = userInfo._id;
        this.#handleClickLike = handleClickLike;
        this.#likes = data.likes;
        this.#dataOwnerId = data.owner._id;
    };

    isLiked() {
        return this.#likes.some((item) => {
            return item._id === this.#userInfoId;
        })
    }

    #toggleDataLike() {
        this.#numberLike.textContent = this.#likes.length;
        if (this.isLiked()) {
            this.#buttonLike.classList.add('element__like_active')
        } else {
            this.#buttonLike.classList.remove('element__like_active')
        }
    }

    setClickLike(item) {
        this.#likes = item.likes;
        this.#toggleDataLike();
    }

    remove() {
        this.#todoElement.remove();
        this.#todoElement = null;
    }

    delCards() {
        return this.#userInfoId === this.#dataOwnerId
    }

    #setEventListeners () {
        this.#delCard.addEventListener('click', () => this.#handleClickDelete(this));
      
        this.#buttonLike.addEventListener('click', () => this.#handleClickLike(this));
      
        this.#popupOpenImg.addEventListener('click', () =>  this.#handleClickEdit(this.#data));
    }

    createCard() {
        this.#todoElement = this.#getTemplate();
        const imgElement = this.#todoElement.querySelector('.element__mask-group');
        const nameElement = this.#todoElement.querySelector('.element__title');
        this.#numberLike = this.#todoElement.querySelector('.element__number-like')
        this.#delCard = this.#todoElement.querySelector('.element__del-card');
        this.#buttonLike = this.#todoElement.querySelector('.element__like');
        this.#popupOpenImg = this.#todoElement.querySelector('.element__img-button');
      
        nameElement.textContent = this.#data.name;
        imgElement.src = this.#data.link;
        imgElement.alt = this.#data.name;

        if (this.#dataOwnerId !== this.#userInfoId) {
            this.#delCard.remove();
        };

        if (this.#likes.some((user) => (user._id === this.#userInfoId))) {
            this.#buttonLike.classList.add('element__like_active')
        };

       
        this.setClickLike(this.#data);
        this.#setEventListeners();
      
        return this.#todoElement;
      };

      getId() {
        return this.#data._id;
      }
}