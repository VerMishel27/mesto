export class FormValidator {
    #data;
    #config;
    #inputList;
    #sumbitButtonElement;
 
    constructor (config, data) {
        this.#data = data;
        this.#config = config;
    };

    #showError(inputElement, errorElement) {
        inputElement.classList.add(this.#config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    };
    
    #hideError(inputElement, errorElement) {
        inputElement.classList.remove(this.#config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    #cheсkInputValidity(inputElement, formElement) {
        const isInputValid = inputElement.validity.valid; // проверяем валидность инпута
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`); // находим элемент ошибки по шаблону
    
        if (!isInputValid) {
            this.#showError(inputElement, errorElement);
        } else {
            this.#hideError(inputElement, errorElement);
        }
    };

    disabledButton(buttonElement) {
        buttonElement.disabled = 'disabled';
        buttonElement.classList.add(this.#config.inactiveButtonClass);
    };
    
    #enableButton(buttonElement) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this.#config.inactiveButtonClass);
    };

    #toggleButtonState(buttonElement, isActive) {
        if (!isActive) {
            this.disabledButton(buttonElement);
        } else {
            this.#enableButton(buttonElement);
        }
    };
   
    enableValidation() {  
        this.#inputList = this.#data.querySelectorAll(this.#config.inputSelector); // находим инпуты формы
        this.#sumbitButtonElement = this.#data.querySelector(this.#config.submitButtonSelector); // находим кнопки формы
        this.#toggleButtonState(this.#sumbitButtonElement, this.#data.checkValidity()); // блокируем кнопку   
        
        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.#toggleButtonState(this.#sumbitButtonElement, this.#data.checkValidity());
                this.#cheсkInputValidity(inputElement, this.#data); // проверяем состояние инпута
            });
        });

        this.#data.addEventListener('submit', (evt) => {
             evt.preventDefault();
        });
        
    }; 
};