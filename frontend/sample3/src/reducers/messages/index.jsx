import {
  MESSAGES_MENU_ITEM_SELECTED,
  MESSAGES_MENU_REQUESTS_ID
} from 'consts';

export default (state = {}, action) => {
  switch (action.type) {
    case MESSAGES_MENU_ITEM_SELECTED:
      return {
        ...state,
        activeMenuItemId: (action.id || MESSAGES_MENU_REQUESTS_ID)
      };
    default:
  }

  return state;
};
