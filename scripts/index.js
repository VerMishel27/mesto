import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';

const buttonOpenEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popupProfile');
const buttonsClosePopup = document.querySelectorAll('.popup__close'); // находим все крестики проекта по универсальному селектору

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const buttonOpenAdd = profile.querySelector('.profile__add-button');

const formEditProfile = document.querySelector('.popup__form'); // Находим форму в DOM
const nameInput = formEditProfile.querySelector('#fieldName'); // Находим поля формы в DOM
const jobInput = formEditProfile.querySelector('#fieldJob');

const popupNewCard = document.querySelector('#popup-newCard'); 
const formNewCard = document.querySelector('#formNewCard'); // Находим форму создания карточки в DOM
const fieldNameCard = formNewCard.querySelector('#fieldNameCard'); // Находим поля формы
const fieldLinkCard = formNewCard.querySelector('#fieldLinkCard');
const buttonSaveNewCard = formNewCard.querySelector('#submit-button_newCard'); // Находим поля формы

const elements = document.querySelector('.elements');
const imagePopup = document.querySelector('#image-popup');
const popupImg = imagePopup.querySelector('.popup__img');
const popupSubtitle = imagePopup.querySelector('.popup__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_opened', 'appearance');
  popup.classList.remove('hiding');
  document.addEventListener('keydown', escClosePopup);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened', 'appearance');
  popup.classList.add('hiding');
  document.removeEventListener('keydown', escClosePopup);
};

buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup'); // находим 1 раз ближайший к крестику попап
  button.addEventListener('click', () => closePopup(popup)); // устанавливаем обработчик закрытия на крестик
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profilePopup);
};

const escClosePopup = (evt) => {
  if (evt.key === 'Escape') {
   const openPopups = document.querySelector('.popup_opened');
   closePopup(openPopups);
  }
 } 

function overlayClosePopup(popup) {  // закрытие попап на оверлей
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    } 
  });
};

function popupsClose () { //нашли все попапы
  const popups = document.querySelectorAll('.popup');

  [...popups].forEach(function (popup) {
    overlayClosePopup(popup);
    //escClosePopup(popup);
  });
}

popupsClose();

function handleSubmitAdd(e) {
  e.preventDefault();
  const link = fieldLinkCard.value;
  const name = fieldNameCard.value;
  const newPost = {name, link};
  
  renderTodo(newPost, elements, 'prepend');
  closePopup(popupNewCard);
  buttonSaveNewCard.disabled = 'disabled';
  buttonSaveNewCard.classList.add(config.inactiveButtonClass);
};

// Создание карточки

function handleClickDelete(todoElement) {
  todoElement.remove();
}

function handleClickEdit(dataTodo) {
  popupImg.src = dataTodo.link;
  popupImg.alt = dataTodo.name;
  popupSubtitle.textContent = dataTodo.name;
  openPopup(imagePopup);
}

function handleClickLike(todoLike) {
  todoLike.classList.add('element__like_active');
}

function renderTodo(data,  container, position = 'append') {
  const todoElement = new Card({data, handleClickDelete, handleClickEdit, handleClickLike}, '.template').createCard();
  //console.log(todoElement.createCard());
  switch (position) {
    case "append":
      container.append(todoElement);
      break;
    case "prepend":
      container.prepend(todoElement);
      break;
    case "before":
      container.before(todoElement);
      break;
    case "after":
      container.after(todoElement);
      break;
    default:
      break;
  }
};

initialCards.forEach(function(item) {
  renderTodo(item, elements);
});

function checkingForm(nameInput) {
  const event = new Event('input');
  nameInput.dispatchEvent(event);
}

function openProfile() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  checkingForm(nameInput);
}

buttonOpenEdit.addEventListener('click', openProfile);

formEditProfile.addEventListener('submit', handleProfileFormSubmit); // Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupNewCard);
  formNewCard.reset();
});

formNewCard.addEventListener('submit', handleSubmitAdd);

// Валидация формы

function setEventListener (data, config) {
    const formsList = new FormValidator({data, config}, config.formSelector).enableValidation();
}

function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);

    [...formsList].forEach(function(formElement) {
        setEventListener(formElement, config);
    })
}

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__field_invalid',
   // buttonSaveNewCard: '#submit-button_newCard',
};

enableValidation(config);