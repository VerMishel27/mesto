function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function chekInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid; // проверяем валидность инпута
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`); // находим элемент ошибки по шаблону

    if (!isInputValid) {
        showError(inputElement, errorElement, config);
    } else {
        hideError(inputElement, errorElement, config);
    }
}

function disabledButton(buttonElement, config) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
    if (!isActive) {
        disabledButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    }
}

function setEventListener (formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector); // находим инпуты формы
    const sumbitButtonElement = formElement.querySelector(config.submitButtonSelector); // находим кнопки формы

    toggleButtonState(sumbitButtonElement, formElement.checkValidity(), config); // блокируем кнопку
    
    
    [...inputList].forEach(function (inputElement) {
        inputElement.addEventListener('input', function() {
            toggleButtonState(sumbitButtonElement, formElement.checkValidity(), config);
            chekInputValidity(inputElement, formElement, config); // проверяем состояние инпута
        });
    });

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
}


function enableValidation(config) {  
    const formsList = document.querySelectorAll(config.formSelector); // находим форму

    [...formsList].forEach(function (formElement) { // перебираем формы
        setEventListener(formElement, config); // передаем форму
    });
}

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__field_invalid',
    //errorClass: 'popup__error_visible',
};

enableValidation(config);

