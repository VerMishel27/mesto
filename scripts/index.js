let buttonOpenEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClosePopup = document.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
let buttonOpenAdd = profile.querySelector('.profile__add-button');

let formElement = document.querySelector('.popup__form'); // Находим форму в DOM
let nameInput = formElement.querySelector('#fieldName'); // Находим поля формы в DOM
let jobInput = formElement.querySelector('#fieldJob');

let popupNewCard = document.querySelector('#popup-newCard'); 
let closeNewCard = popupNewCard.querySelector('#closeNewCard');
let formNewCard = document.querySelector('#formNewCard'); // Находим форму создания карточки в DOM
let fieldNameCard = formNewCard.querySelector('#fieldNameCard'); // Находим поля формы
let fieldLinkCard = formNewCard.querySelector('#fieldLinkCard'); // Находим поля формы

function showClick() {
    popup.classList.add('popup_opened', 'appearance');
    popup.classList.remove('hiding');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function hideClick() {
    popup.classList.remove('popup_opened', 'appearance');
    popup.classList.add('hiding');
}

function showClickNewCard() {
  popupNewCard.classList.add('popup_opened', 'appearance');
  popupNewCard.classList.remove('hiding');
}

function hideClickNewCard() {
  popupNewCard.classList.remove('popup_opened', 'appearance');
  popupNewCard.classList.add('hiding');
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    hideClick();
}





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
const imagePopupClose = imagePopup.querySelector('#imagePopupClose');
const popupImg = imagePopup.querySelector('.popup__img');
const popupSubtitle = imagePopup.querySelector('.popup__subtitle');


function handleSumbitAdd(e) {
  e.preventDefault();
  const link = fieldLinkCard.value;
  const name = fieldNameCard.value;
  const newPost = {name, link};
  
  renderTodo(newPost, elements, 'prepend');
  hideClickNewCard();
};



function createTodo(card) {
  const todoElement = template.cloneNode(true);
  const imgElement = todoElement.querySelector('.element__mask-group');
  const nameElement = todoElement.querySelector('.element__title');
  const delCard = todoElement.querySelector('.element__del-card');
  const buttonLike = todoElement.querySelector('.element__like');
  const popupOpenImg = todoElement.querySelector('.element__img-button');

  nameElement.textContent = card.name;
  imgElement.src = card.link;

  delCard.addEventListener('click', function () {
    todoElement.remove();
  })

  buttonLike.addEventListener('click', function () {
    buttonLike.classList.add('element__like_active');
  })

  popupOpenImg.addEventListener('click', function () {
    imagePopup.classList.add('popup_opened', 'appearance');
    imagePopup.classList.remove('hiding');
    popupImg.src = card.link;
    popupSubtitle.textContent = card.name;
  })

  imagePopupClose.addEventListener('click', function() {
    imagePopup.classList.remove('popup_opened', 'appearance');
    imagePopup.classList.add('hiding');
  })

  return todoElement;
}

function renderTodo(data,  container, position = 'append') {
  switch (position) {
    case "append":
      container.append(createTodo(data));
      break;
    case "prepend":
      container.prepend(createTodo(data));
      break;
    case "before":
      container.before(createTodo(data));
      break;
    case "after":
      container.after(createTodo(data));
      break;
    default:
      break;
  }
}

initialCards.forEach(function(item) {
  renderTodo(item, elements);
})


formElement.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
buttonOpenEdit.addEventListener('click', showClick);
buttonClosePopup.addEventListener('click', hideClick);


buttonOpenAdd.addEventListener('click', showClickNewCard);
closeNewCard.addEventListener('click', hideClickNewCard);
formNewCard.addEventListener('submit', handleSumbitAdd);



