import { handleActions, handleAction } from 'redux-actions';

import {
  TOP_MENU_PROFILE_ITEM_ID,
  DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,
  SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID
} from 'consts';

import {
  selectMenuItem,
  selectDetailsMenuItem,
  selectSettingsMenuItem,
  toggleAccountsMenu,
} from 'actions';

export const visibilityTopMenu = handleActions({
  [selectMenuItem](state = TOP_MENU_PROFILE_ITEM_ID, action) {
    return action.payload || TOP_MENU_PROFILE_ITEM_ID;
  }
}, TOP_MENU_PROFILE_ITEM_ID);

export const visibilityDetailsMenu = handleActions({
  [selectDetailsMenuItem](state = DETAILS_MENU_OPERATION_HISTORY_ITEM_ID, action) {
    return action.payload || DETAILS_MENU_OPERATION_HISTORY_ITEM_ID;
  }
}, DETAILS_MENU_OPERATION_HISTORY_ITEM_ID);

export const visibilitySettingsMenu = handleActions({
  [selectSettingsMenuItem](state = SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID, action) {
    return action.payload || SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID;
  }
}, SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID);

export const visibilityAccountsMenu = handleAction([toggleAccountsMenu], state => !state, false);

