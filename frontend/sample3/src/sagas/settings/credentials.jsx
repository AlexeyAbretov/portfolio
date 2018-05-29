/* eslint arrow-parens:0 */

import { put, takeEvery } from 'redux-saga/effects';
import { CHANGE_LOGIN, CHANGE_PASSWORD, OperationStatus } from '../../consts';
import {
    changeLoginAwaiter,
    changePasswordAwaiter
  } from '../../actions';
import api from '../api';

export function* changeLoginAsync(action) {
  yield put(changeLoginAwaiter({ status: OperationStatus.Pending }));

  try {
    const result = yield api.changeLogin(action.data.alias);
    if (result.isSucceeded && result.result) {
      yield put(changeLoginAwaiter({
        status: OperationStatus.Success,
        alias: action.data.alias,
        isNotificationVisible: result.isSucceeded && result.result
      }));
    } else {
      yield put(changeLoginAwaiter({ status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(changeLoginAwaiter({ status: OperationStatus.Fail }));
    throw e;
  }
}

export function* changePasswordAsync(action) {
  yield put(changePasswordAwaiter({ status: OperationStatus.Pending }));

  try {
    const { login, newPassword, oldPassword } = { ...action.data };
    const result = yield api.changePassword(login, newPassword, oldPassword);
    if (!result.isSucceeded) {
      yield put(changePasswordAwaiter({ status: OperationStatus.Fail }));
    } else {
      yield put(changePasswordAwaiter({ status: OperationStatus.Success, result }));
    }
  } catch (e) {
    yield put(changePasswordAwaiter({ status: OperationStatus.Fail }));
    throw e;
  }
}

export default function* () {
  yield takeEvery(CHANGE_LOGIN, changeLoginAsync);
  yield takeEvery(CHANGE_PASSWORD, changePasswordAsync);
}
