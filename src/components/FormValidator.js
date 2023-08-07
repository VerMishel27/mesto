export class FormValidator {
    #data;
    #formElements;
    #inputList;
    #sumbitButtonElement;
 
    constructor (formElements, data) {
        this.#data = data;
        this.#formElements = formElements;
    };

    #showError(inputElement, errorElement) {
        inputElement.classList.add(this.#formElements.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    };
    
    #hideError(inputElement, errorElement) {
        inputElement.classList.remove(this.#formElements.inputErrorClass);
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
        this.#sumbitButtonElement.classList.add(this.#formElements.inactiveButtonClass);
    };
    
    #enableButton() {
        this.#sumbitButtonElement.disabled = false;
        this.#sumbitButtonElement.classList.remove(this.#formElements.inactiveButtonClass);
    };

    #toggleButtonState(isActive) {
        if (!isActive) {
            this.disabledButton(this.#sumbitButtonElement);
        } else {
            this.#enableButton(this.#sumbitButtonElement);
        }
    };
   
    enableValidation() {  
        this.#inputList = this.#data.querySelectorAll(this.#formElements.inputSelector); // находим инпуты формы
        this.#sumbitButtonElement = this.#data.querySelector(this.#formElements.submitButtonSelector); // находим кнопки формы
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