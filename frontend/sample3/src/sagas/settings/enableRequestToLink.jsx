import { put, takeEvery } from 'redux-saga/effects';
import { ENABLE_REQUEST_TO_LINK } from '../../consts';
import { enableRequestToLinkSuccess } from '../../actions';
import api from '../api';

function* enableRequestToLinkAsync(action) {
  try {
    const result = yield api.enableRequestToLink(action.data);
    if (result.isSucceeded) {
      yield put(enableRequestToLinkSuccess(action.data));
    } else {
      yield put(enableRequestToLinkSuccess(!action.data));
    }
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(ENABLE_REQUEST_TO_LINK, enableRequestToLinkAsync);
}
