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

  const buttonSaveNewCard = document.querySelector('#submit-button_newCard');
  disabledButton(buttonSaveNewCard, config);
};


function createCard(card) {
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
    popupImg.src = card.link;
    popupImg.alt = card.name;
    popupSubtitle.textContent = card.name;
    openPopup(imagePopup);
  });

  return todoElement;
};

function renderTodo(data,  container, position = 'append') {
  switch (position) {
    case "append":
      container.append(createCard(data));
      break;
    case "prepend":
      container.prepend(createCard(data));
      break;
    case "before":
      container.before(createCard(data));
      break;
    case "after":
      container.after(createCard(data));
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

formElement.addEventListener('submit', handleProfileFormSubmit); // Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»


buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupNewCard);
  formNewCard.reset();
});

formNewCard.addEventListener('submit', handleSubmitAdd);

