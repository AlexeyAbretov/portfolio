import {
  SET_DETAILS_FILTER,
  DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,
  DETAILS_MENU_PAYMENTS_ITEM_ID,
  DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID,
  DETAILS_MENU_TURBO_BUTTON_ITEM_ID,
  DETAILS_MENU_DISCOUNTS_ITEM_ID,
  DETAILS_MENU_INTERNET_ITEM_ID,
  DETAILS_MENU_CALLS_ITEM_ID,
} from 'consts';

import Utils from 'utils';

const initialDateRangeState = {
  startDate: Utils.today(-14),
  endDate: Utils.today()
};

const initialState = {
  [DETAILS_MENU_OPERATION_HISTORY_ITEM_ID]: initialDateRangeState,
  [DETAILS_MENU_PAYMENTS_ITEM_ID]: initialDateRangeState,
  [DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID]: initialDateRangeState,
  [DETAILS_MENU_TURBO_BUTTON_ITEM_ID]: initialDateRangeState,
  [DETAILS_MENU_DISCOUNTS_ITEM_ID]: initialDateRangeState,
  [DETAILS_MENU_INTERNET_ITEM_ID]: initialDateRangeState,
  [DETAILS_MENU_CALLS_ITEM_ID]: initialDateRangeState
};

export default (state = initialState, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case SET_DETAILS_FILTER:
      newState[action.key] = {
        startDate: action.startDate,
        endDate: action.endDate
      };

      return newState;
    default:
  }

  return state;
}
;
