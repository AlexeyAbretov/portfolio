/* eslint no-case-declarations: 0 */
/* eslint default-case: 0 */

import { put } from 'redux-saga/effects';

import {
  DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,
  DETAILS_MENU_PAYMENTS_ITEM_ID,
  DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID,
  DETAILS_MENU_DISCOUNTS_ITEM_ID,
  DETAILS_MENU_TURBO_BUTTON_ITEM_ID,
  DETAILS_MENU_INTERNET_ITEM_ID,
  DETAILS_MENU_CALLS_ITEM_ID,

  DateFormats
} from 'consts';

import {
  getOperationHistory,
  getPaymentHistory,
  getServicesHistory,
  getDiscountsHistory,
  getTurboButtonActivity,
  getInternetHistory,
  getCallsHistory
} from 'actions';

import Utils from 'utils';

import api from '../api';

function* loadData(detailsMenuItemId, filter) {
  const startDate = Utils.formatDate(
    filter.startDate,
    DateFormats.FullDate);

  const endDate = Utils.formatDate(
    filter.endDate,
    DateFormats.FullDate);

  switch (detailsMenuItemId) {
    case DETAILS_MENU_OPERATION_HISTORY_ITEM_ID:
      const operatins = yield api.getOperationHistory(
          startDate,
          endDate);

      yield put(getOperationHistory(operatins || []));
      break;
    case DETAILS_MENU_PAYMENTS_ITEM_ID:
      const payments = yield api.getPayments(
          startDate,
          endDate);

      yield put(getPaymentHistory(payments || []));
      break;
    case DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID:
      const services = yield api.getServicesActivity(
          startDate,
          endDate);

      yield put(getServicesHistory(services || []));
      break;
    case DETAILS_MENU_DISCOUNTS_ITEM_ID:
      const discounts = yield api.getDiscounts(
          startDate,
          endDate
        );

      yield put(getDiscountsHistory(discounts || []));
      break;
    case DETAILS_MENU_TURBO_BUTTON_ITEM_ID:
      const turbo = yield api.getTurboButtonActivity(
          startDate,
          endDate
        );

      yield put(getTurboButtonActivity(turbo || []));
      break;
    case DETAILS_MENU_INTERNET_ITEM_ID:
      const internet = yield api.getInternetHistory(
          startDate,
          endDate);

      yield put(getInternetHistory(internet || []));
      break;
    case DETAILS_MENU_CALLS_ITEM_ID:
      const calls = yield api.getCallsHistory(
          startDate,
          endDate);

      yield put(getCallsHistory(calls || []));
      break;
  }
}

export default loadData;
