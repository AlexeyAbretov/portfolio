/* eslint no-case-declarations: 0 */
/* eslint default-case: 0 */

import { takeEvery } from 'redux-saga/effects';

import {
  SET_DETAILS_FILTER
} from 'consts';

import loadData from './api';

function* getDataAsync(options) {
  try {
    yield loadData(
      options.key,
      {
        startDate: options.startDate,
        endDate: options.endDate
      });
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(SET_DETAILS_FILTER, getDataAsync);
}
