import {buttonSaveNewCard} from '../pages/index.js';
import { buttonDelCard } from '../pages/index.js';

export function saveLoading(isLoading, button) {
    if (isLoading) {
      if (button === buttonSaveNewCard) {
        button.textContent = 'Создание...';
      } else if (button === buttonDelCard) {
        button.textContent = 'Удаление...'
      } else {
        button.textContent = 'Сохранение...';
      }
    } else {
      if (button === buttonSaveNewCard) {
        button.textContent = 'Создать';
      } else if (button === buttonDelCard) {
        button.textContent = 'Да'
      }  else {
        button.textContent = 'Сохранить';
      }
     
    }
  }