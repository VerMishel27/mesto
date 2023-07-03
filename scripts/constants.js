const buttonOpenEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popupProfile');
const buttonsClosePopup = document.querySelectorAll('.popup__close'); // находим все крестики проекта по универсальному селектору

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const buttonOpenAdd = profile.querySelector('.profile__add-button');

const formElement = document.querySelector('.popup__form'); // Находим форму в DOM
const nameInput = formElement.querySelector('#fieldName'); // Находим поля формы в DOM
const jobInput = formElement.querySelector('#fieldJob');

const popupNewCard = document.querySelector('#popup-newCard'); 
const formNewCard = document.querySelector('#formNewCard'); // Находим форму создания карточки в DOM
const fieldNameCard = formNewCard.querySelector('#fieldNameCard'); // Находим поля формы
const fieldLinkCard = formNewCard.querySelector('#fieldLinkCard'); // Находим поля формы

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elements = document.querySelector('.elements');
const template = document.querySelector('.template').content.querySelector('.element');
const imagePopup = document.querySelector('#image-popup');
const popupImg = imagePopup.querySelector('.popup__img');
const popupSubtitle = imagePopup.querySelector('.popup__subtitle');