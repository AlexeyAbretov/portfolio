import { put, takeEvery } from 'redux-saga/effects';

import {
  REQUEST_DETAILS_REQUESTED
} from 'consts';

import {
  SetRequestDetails
} from 'actions';

import api from '../api';

export function* fetchData(action) {
  try {
    const details = yield api.getRequestDetails(action.requestId);
    yield put(SetRequestDetails(details));
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(REQUEST_DETAILS_REQUESTED, fetchData);
}
