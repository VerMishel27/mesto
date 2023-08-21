export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__field_invalid',
  };

export const elements = '.elements';
export const profilePopup = '#popupProfile';
export const popupDelCard = '#popup-delCard';
export const buttonDelCard = '#submit-button_delCard';
export const formDelCard = '#formDelCard';
export const profileName = '.profile__name';
export const profileDescription = '.profile__description';
export const popupNewCard = '#popup-newCard';
export const imagePopup = '#image-popup';
export const avatarPopupNew = '#popup-newAvatar';

export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: 'da96f1c4-c52a-4b63-8218-e123775712c9',
    "Content-Type": "application/json"
  }
}