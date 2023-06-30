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


function openPopup(popup) {
  popup.classList.add('popup_opened', 'appearance');
  popup.classList.remove('hiding');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened', 'appearance');
  popup.classList.add('hiding');
};

buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup'); // находим 1 раз ближайший к крестику попап
  button.addEventListener('click', () => closePopup(popup)); // устанавливаем обработчик закрытия на крестик
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profilePopup);
};


function escClosePopup(popupElement) {  // закрытие попап на esc
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popupElement)
    }
  });
}

function overlayClosePopup(popupElement) {  // закрытие попап на оверлей
  popupElement.addEventListener('click', (evt) => {
    if (evt.target === popupElement) {
      closePopup(popupElement);
    } 
  });
};

function popupsClose () { //нашли все попапы
  const popups = document.querySelectorAll('.popup');

  [...popups].forEach(function (popupElement) {
    overlayClosePopup(popupElement);
    escClosePopup(popupElement);
  });
}

popupsClose();

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
//const imagePopupClose = imagePopup.querySelector('#imagePopupClose');
const popupImg = imagePopup.querySelector('.popup__img');
const popupSubtitle = imagePopup.querySelector('.popup__subtitle');


function handleSumbitAdd(e) {
  e.preventDefault();
  const link = fieldLinkCard.value;
  const name = fieldNameCard.value;
  const newPost = {name, link};
  
  renderTodo(newPost, elements, 'prepend');
  closePopup(popupNewCard);
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
  imgElement.alt = card.name;

  delCard.addEventListener('click', function () {
    todoElement.remove();
  });

  buttonLike.addEventListener('click', function () {
    buttonLike.classList.add('element__like_active');
  });

  popupOpenImg.addEventListener('click', function () {
    openPopup(imagePopup);
    popupImg.src = card.link;
    popupImg.alt = card.name;
    popupSubtitle.textContent = card.name;
  });

  return todoElement;
};

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
};

initialCards.forEach(function(item) {
  renderTodo(item, elements);
});

function checkingForm(nameInput) {
  const event = new Event('input');
  nameInput.dispatchEvent(event);
}

buttonOpenEdit.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  checkingForm(nameInput);
});

formElement.addEventListener('submit', handleFormSubmit); // Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»


buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupNewCard);
  formNewCard.reset();
});

formNewCard.addEventListener('submit', handleSumbitAdd);

