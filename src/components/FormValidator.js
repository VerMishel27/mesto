export class FormValidator {
    #data;
    #formElement;
    #inputList;
    #sumbitButtonElement;
 
    constructor (formElement, data) {
        this.#data = data;
        this.#formElement = formElement;
    };

    #showError(inputElement, errorElement) {
        inputElement.classList.add(this.#formElement.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    };
    
    #hideError(inputElement, errorElement) {
        inputElement.classList.remove(this.#formElement.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    #cheсkInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid; // проверяем валидность инпута
        const errorElement = this.#data.querySelector(`#${inputElement.name}-error`); // находим элемент ошибки по шаблону
    
        if (!isInputValid) {
            this.#showError(inputElement, errorElement);
        } else {
            this.#hideError(inputElement, errorElement);
        }
    };

    disabledButton() {
        this.#sumbitButtonElement.disabled = 'disabled';
        this.#sumbitButtonElement.classList.add(this.#formElement.inactiveButtonClass);
    };
    
    #enableButton() {
        this.#sumbitButtonElement.disabled = false;
        this.#sumbitButtonElement.classList.remove(this.#formElement.inactiveButtonClass);
    };

    #toggleButtonState(isActive) {
        if (!isActive) {
            this.disabledButton(this.#sumbitButtonElement);
        } else {
            this.#enableButton(this.#sumbitButtonElement);
        }
    };
   
    enableValidation() {  
        this.#inputList = this.#data.querySelectorAll(this.#formElement.inputSelector); // находим инпуты формы
        this.#sumbitButtonElement = this.#data.querySelector(this.#formElement.submitButtonSelector); // находим кнопки формы
        this.#toggleButtonState(this.#sumbitButtonElement, this.#data.checkValidity()); // блокируем кнопку   
        
        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.#toggleButtonState(this.#data.checkValidity());
                this.#cheсkInputValidity(inputElement); // проверяем состояние инпута
            });
        });

        this.#data.addEventListener('submit', (evt) => {
             evt.preventDefault();
        });
        
    }; 
};