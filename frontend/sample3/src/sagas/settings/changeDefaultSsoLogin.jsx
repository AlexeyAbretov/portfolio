import { put, takeEvery } from 'redux-saga/effects';
import { CHANGE_DEFAULT_SSO_LOGIN } from '../../consts';
import { changeDefaultSsoLoginSuccess } from '../../actions';
import api from '../api';

function* changeDefaultSsoLoginAsync(action) {
  try {
    const result = yield api.changeDefaultSsoLogin(action.data.login, action.data.ctn);
    if (result && result.isSucceeded === true) {
      yield put(changeDefaultSsoLoginSuccess(action.data.login));
    }
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(CHANGE_DEFAULT_SSO_LOGIN, changeDefaultSsoLoginAsync);
}
