import { LuTimer } from 'react-icons/lu';

export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  WARNING: 'warning',
  TIMER: 'timer',
  HINT: 'hint',
  CONTINUE: 'continue',
  NEW_GAME: 'newGame',
  MAIN_MENU: 'mainMenu',
  SETTINGS: 'settings',
  SHOW_ANSWER: 'showAnswer',
  SELECT_CATEGORY: 'selectCategory',
  TRY_AGAIN: 'tryAgain'
};

export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

export const BUTTON_TEXTS = {
  [BUTTON_VARIANTS.CONTINUE]: 'Продовжити',
  [BUTTON_VARIANTS.NEW_GAME]: 'Нова гра',
  [BUTTON_VARIANTS.MAIN_MENU]: 'Головне меню',
  [BUTTON_VARIANTS.SETTINGS]: 'Налаштування',
  [BUTTON_VARIANTS.SHOW_ANSWER]: 'Показати відповідь',
  [BUTTON_VARIANTS.SELECT_CATEGORY]: 'Обрати категорію',
  [BUTTON_VARIANTS.TRY_AGAIN]: 'ПОВТОРИТИ',
  [BUTTON_VARIANTS.HINT]: 'Підказка',
  [BUTTON_VARIANTS.TIMER]: ''
};

export const BUTTON_ICONS = {
  [BUTTON_VARIANTS.TIMER]: LuTimer
};

Object.freeze(BUTTON_VARIANTS);
Object.freeze(BUTTON_SIZES);
Object.freeze(BUTTON_TEXTS);
Object.freeze(BUTTON_ICONS);