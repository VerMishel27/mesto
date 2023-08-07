import './index.css';

import { initialCards } from '../utils/initialCards.js';
import { config } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { elements } from '../utils/constants.js';
import { profilePopup } from '../utils/constants.js';
import { profileName } from '../utils/constants.js';
import { profileDescription } from '../utils/constants.js';
import { popupNewCard } from '../utils/constants.js';
import { imagePopup } from '../utils/constants.js';
import Card from '../components/Card.js';
import Popup  from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const buttonOpenEdit = document.querySelector('.profile__edit-button');

const profile = document.querySelector('.profile');

const buttonOpenAdd = profile.querySelector('.profile__add-button');

const formEditProfile = document.querySelector('.popup__form'); // Находим форму в DOM
const nameInput = formEditProfile.querySelector('#fieldName'); // Находим поля формы в DOM
const jobInput = formEditProfile.querySelector('#fieldJob');

const formNewCard = document.querySelector('#formNewCard'); // Находим форму создания карточки в DOM
const buttonSaveNewCard = formNewCard.querySelector('#submit-button_newCard'); 

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

  cardsList.addItem(creatingCard(newPost), 'prepend');

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

function creatingCard (dataCard) {
  const todoElement = new Card(dataCard, handleClickEdit, '.template').createCard();

  return todoElement;
}

const handleClickEdit = (dataTodo) => {
  changeStatePopupImage.open(dataTodo);
}

const cardsList = new Section ({
  renderer: (initialItem) => {
    cardsList.addItem(creatingCard(initialItem))
  },
},
elements
);

cardsList.renderItems(initialCards);

// Слушатели открытия попап

function openProfile() {
  changeStatePopupProfile.open();
  const dataProfile = userInfo.getUserInfo();
  nameInput.value = dataProfile.userName;
  jobInput.value = dataProfile.userJob;
  checkingForm(nameInput);
}

buttonOpenEdit.addEventListener('click', openProfile);

function openPopapNewCard () {
  changeStatePopupNewCard.open();
  validatorAddCard.disabledButton(buttonSaveNewCard);
}

buttonOpenAdd.addEventListener('click', openPopapNewCard);