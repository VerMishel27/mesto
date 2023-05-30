let openButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__job'); // Воспользуйтесь инструментом .querySelector()


openButton.addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}); 

close.addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.remove('popup_opened');
}); 





// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let valueName = nameInput.value;
    let valueJob = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = profile.querySelector('.profile__name');
    let profileDescription = profile.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = valueName;
    profileDescription.textContent = valueJob;

    popup.classList.remove('popup_opened');
    console.log('пока');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);