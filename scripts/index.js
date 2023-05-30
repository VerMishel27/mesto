let buttonOpenEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClosePopup = document.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

let formElement = document.querySelector('.popup__form'); // Находим форму в DOM
let nameInput = formElement.querySelector('#fieldName'); // Находим поля формы в DOM
let jobInput = formElement.querySelector('#fieldJob');
let buttonSubmitPopup = formElement.querySelector('.popup__submit-button');

function showClick() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

buttonOpenEdit.addEventListener('click', showClick);

function hideClick() {
    popup.classList.remove('popup_opened');
}

buttonClosePopup.addEventListener('click', hideClick);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
buttonSubmitPopup.addEventListener('click', hideClick);