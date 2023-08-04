import { initialCards } from './initialCards.js';
import { config } from './configValidForm.js';
import { FormValidator } from './FormValidator.js';
import Card from './Card.js';
import Popup  from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const buttonOpenEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popupProfile');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const buttonOpenAdd = profile.querySelector('.profile__add-button');

const formEditProfile = document.querySelector('.popup__form'); // Находим форму в DOM
const nameInput = formEditProfile.querySelector('#fieldName'); // Находим поля формы в DOM
const jobInput = formEditProfile.querySelector('#fieldJob');

const popupNewCard = document.querySelector('#popup-newCard');
const formNewCard = document.querySelector('#formNewCard'); // Находим форму создания карточки в DOM
const buttonSaveNewCard = formNewCard.querySelector('#submit-button_newCard'); 

const elements = '.elements';
const imagePopup = document.querySelector('#image-popup');

// Открытие закрытие попап

const changeStatePopupProfile = new Popup(profilePopup);
const changeStatePopupNewCard = new Popup(popupNewCard);
const changeStatePopupImage = new PopupWithImage(imagePopup);

// Валидация формы

const validatorEditProfile = new FormValidator(config, formEditProfile);
validatorEditProfile.enableValidation();
const validatorAddCard = new FormValidator(config, formNewCard);
validatorAddCard.enableValidation();

// Профиль пользователя

const userInfo = new UserInfo(profileName, profileDescription);

// Проверка Sumbit

function callbackSumbitFormNewCard (formData) {
  const name = formData['name-card'];
  const link = formData['link-card'];
  const newPost = {name, link};

  const cardPopupNew = new Card(newPost, handleClickEdit, '.template').createCard();
  cardsList.addItem(cardPopupNew, 'prepend');

  popupNewCardForm.close();
}

const popupNewCardForm = new PopupWithForm(popupNewCard, callbackSumbitFormNewCard);
popupNewCardForm.setEventListeners();

function callbackSumbitFormprofile (formData) {
    const profileName = formData.name;
    const profileJob = formData.job;
    userInfo.setUserInfo(profileName, profileJob)
    changeStatePopupProfile.close();
}

const popupProfileNew = new PopupWithForm(profilePopup, callbackSumbitFormprofile);
popupProfileNew.setEventListeners();

function checkingForm(nameInput) {
  const event = new Event('input');
  nameInput.dispatchEvent(event);
}

// Создание карточки

const handleClickEdit = (dataTodo) => {
  changeStatePopupImage.open(dataTodo);
}

const cardsList = new Section ({
  items: initialCards,
  renderer: (initialItem) => {
    const todoElement = new Card(initialItem, handleClickEdit, '.template').createCard();

    cardsList.addItem(todoElement)
  },
},
elements
);

cardsList.renderItems();

// Слушатели открытия попап

function openProfile() {
  changeStatePopupProfile.open();
  userInfo.getUserInfo(nameInput, jobInput);
  checkingForm(nameInput);
}

buttonOpenEdit.addEventListener('click', openProfile);

function openPopapNewCard () {
  changeStatePopupNewCard.open();
  validatorAddCard.disabledButton(buttonSaveNewCard);
}

buttonOpenAdd.addEventListener('click', openPopapNewCard);