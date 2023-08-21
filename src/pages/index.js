import './index.css';

import Api from '../components/Api.js';
import { configApi } from '../utils/constants.js';
import { config } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { elements } from '../utils/constants.js';
import { profilePopup } from '../utils/constants.js';
import { profileName } from '../utils/constants.js';
import { profileDescription } from '../utils/constants.js';
import { popupNewCard } from '../utils/constants.js';
import { imagePopup } from '../utils/constants.js';
import { popupDelCard } from '../utils/constants.js';
//import { buttonDelCard } from '../utils/constants.js';
import { formDelCard } from '../utils/constants.js';
import { avatarPopupNew } from '../utils/constants.js';
import Card from '../components/Card.js';
import Popup  from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
//import { data } from 'autoprefixer';

const buttonOpenEdit = document.querySelector('.profile__edit-button');

const profile = document.querySelector('.profile');
const profileAvatar = document.querySelector('.profile__avatar');
const buttonAvatar = document.querySelector('.profile__avatar__changing');
const formAvatar = document.querySelector('#formNewAvatar')

const buttonOpenAdd = profile.querySelector('.profile__add-button');

const formEditProfile = document.querySelector('.popup__form'); // Находим форму в DOM
const nameInput = formEditProfile.querySelector('#fieldName'); // Находим поля формы в DOM
const jobInput = formEditProfile.querySelector('#fieldJob');

const formNewCard = document.querySelector('#formNewCard'); // Находим форму создания карточки в DOM
const buttonSaveNewCard = formNewCard.querySelector('#submit-button_newCard'); 
const buttonSaveNewAvatar = document.querySelector('#submit-button_newAvatar')

// Запрос на сервер

const api = new Api(configApi);

// Открытие закрытие попап

const changeStatePopupProfile = new Popup(profilePopup);
const changeStatePopupNewCard = new Popup(popupNewCard);
const changeStatePopupImage = new PopupWithImage(imagePopup);
const changeStatePopupDelCard = new Popup(popupDelCard);
const changeStatePopupNewAvatar = new Popup(avatarPopupNew);

// Валидация формы

const validatorEditProfile = new FormValidator(config, formEditProfile);
validatorEditProfile.enableValidation();
const validatorAddCard = new FormValidator(config, formNewCard);
validatorAddCard.enableValidation();
const validatorAddAvatar = new FormValidator(config, formAvatar);
validatorAddAvatar.enableValidation();

// Профиль пользователя

const userInfo = new UserInfo(profileName, profileDescription);

// Проверка Sumbit

function callbackSumbitFormNewCard (formData, button) {
  const name = formData['name-card'];
  const link = formData['link-card'];
  const newPost = {name, link};

  api.addCard(newPost)
  .then(data => {
    cardsList.addItem(creatingCard(data, data.owner), 'prepend');
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupNewCardForm.close();
      saveLoading(false, button)
    });
}

const popupNewCardForm = new PopupWithForm(popupNewCard, callbackSumbitFormNewCard, saveLoading);
popupNewCardForm.setEventListeners();

function callbackSumbitFormprofile (formData, button) {
    const name = formData.name;
    const about = formData.job;
    const dataProfile = {name, about};

    userInfo.setUserInfo(name, about);
    api.editingProfile(dataProfile)
      .catch((err) => console.log(err))
      .finally(() => {
        changeStatePopupProfile.close();
        saveLoading(false, button)
      });
}

const popupProfileNew = new PopupWithForm(profilePopup, callbackSumbitFormprofile, saveLoading);
popupProfileNew.setEventListeners();

function callbackNewAvatar(data, button) {
  const avatar = data['link-avatar'];
  const avatarka = {avatar};

  api.avatarProfile(avatarka)
    .then(profileAvatar.src = avatarka.avatar)
    .catch((err) => console.log(err))
    .finally(() => {
      changeStatePopupNewAvatar.close();
      saveLoading(false, button)
    })
}

const avatarProfile = new PopupWithForm(avatarPopupNew, callbackNewAvatar, saveLoading);
avatarProfile.setEventListeners();

function checkingForm(nameInput) {
  const event = new Event('input');
  nameInput.dispatchEvent(event);
}

// Создание карточки

function creatingCard (dataCard, userInfo) {
  const todoElement = new Card(dataCard, handleClickEdit, handleClickDelete, handleClickLike, userInfo, '.template').createCard();
  return todoElement;
}

function handleClickLike (todoLike) {
  if (todoLike.isLiked()) {
    api.delLike(todoLike.getId())
    .then(data => {
      todoLike.setClickLike(data)
      //console.log('удалили')
    })
    .catch((err) => console.log(err))  
  } else {
    api.addLike(todoLike.getId())
    .then(data => {
      todoLike.setClickLike(data)
      //console.log('поставили')
    })
    .catch((err) => console.log(err))
  }
}

function handleClickDelete(todoElement) {
  changeStatePopupDelCard.open();
  
  function delCard(data, button) {   
      if (todoElement.delCards()) {
        button.textContent = 'Удаление...';
        api.removeCard(todoElement.getId())
          .then(() => todoElement.remove())
          .catch((err) => console.log(err))
          .finally(() => {
            changeStatePopupDelCard.close();
            saveLoading(false, button)
            button.textContent = 'Да'
      })
      }
  }
    const popupDelCards = new PopupWithForm(popupDelCard, delCard, saveLoading);
    popupDelCards.setEventListeners()
  } 

  function saveLoading(isLoading, button) {
    if (isLoading) {
      if (button === buttonSaveNewCard) {
        button.textContent = 'Создание...';
      } else {
        button.textContent = 'Сохранение...';
      }
    } else {
      if (button === buttonSaveNewCard) {
        button.textContent = 'Создать';
      } else {
        button.textContent = 'Сохранить';
      }
     
    }
  }

const handleClickEdit = (dataTodo) => {
  changeStatePopupImage.open(dataTodo);
}

const cardsList = new Section ({
  renderer: (initialItem, userData) => {
    cardsList.addItem(creatingCard(initialItem, userData))
  },
},
elements
);

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

Promise.all([api.dataProfile(), api.getInitialCards()])
  .then(([dataProfile, dataCards]) => {
    userInfo.setUserInfo(dataProfile.name, dataProfile.about);
    profileAvatar.src = dataProfile.avatar;
    cardsList.renderItems(dataCards, dataProfile)
  })
  .catch((err) => console.log(err))

buttonAvatar.addEventListener('mouseover', () => {buttonAvatar.style.cssText = 'opacity: 1'})
buttonAvatar.addEventListener('mouseout', () => {buttonAvatar.style.cssText = 'opacity: 0'})
buttonAvatar.addEventListener('click', ()=> {
    changeStatePopupNewAvatar.open();
    validatorAddAvatar.disabledButton(buttonSaveNewAvatar)
  })