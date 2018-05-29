import { put, takeEvery } from 'redux-saga/effects';
import { DELETE_ACCOUNT } from '../../consts';
import { deleteAccountSuccess } from '../../actions';
import api from '../api';

function* deleteAccountAsync(action) {
  try {
    const result = yield api.deleteAccount(action.data.linkedLogin, action.data.isCurrentAccSlave);
    if (result && result.isSucceeded === true) {
      yield put(deleteAccountSuccess(action.data));
    }
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(DELETE_ACCOUNT, deleteAccountAsync);
}
