/* eslint arrow-parens:0 */

import { put, takeEvery } from 'redux-saga/effects';
import { ACCEPT_INVITE, REJECT_INVITE, CANCEL_INVITE, OperationStatus } from '../../consts';
import {
    acceptInviteAwaiter,
    rejectInviteAwaiter,
    cancelInviteAwaiter
  } from '../../actions';
import api from '../api';

function* acceptInviteAsync(action) {
  yield put(acceptInviteAwaiter({ status: OperationStatus.Pending, initiatorName: action.data }));

  try {
    const result = yield api.acceptInvite(action.data);
    if (result.isSucceeded === true) {
      yield put(acceptInviteAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    } else {
      yield put(acceptInviteAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    }
  } catch (e) {
    yield put(acceptInviteAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    throw e;
  }
}

function* rejectInviteAsync(action) {
  yield put(rejectInviteAwaiter({ status: OperationStatus.Pending, initiatorName: action.data }));

  try {
    const result = yield api.rejectInvite(action.data);
    if (result.isSucceeded === true) {
      yield put(rejectInviteAwaiter({ status: OperationStatus.Success, initiatorName: action.data }));
    } else {
      yield put(rejectInviteAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    }
  } catch (e) {
    yield put(rejectInviteAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    throw e;
  }
}

function* cancelInviteAsync(action) {
  yield put(cancelInviteAwaiter({ status: OperationStatus.Pending, destinationName: action.data }));

  try {
    const result = yield api.cancelInvite(action.data);
    if (result.isSucceeded === true) {
      yield put(cancelInviteAwaiter({ status: OperationStatus.Success, destinationName: action.data }));
    } else {
      yield put(cancelInviteAwaiter({ status: OperationStatus.Fail, destinationName: action.data }));
    }
  } catch (e) {
    yield put(cancelInviteAwaiter({ status: OperationStatus.Fail, destinationName: action.data }));
    throw e;
  }
}

export default function* () {
  yield takeEvery(ACCEPT_INVITE, acceptInviteAsync);
  yield takeEvery(REJECT_INVITE, rejectInviteAsync);
  yield takeEvery(CANCEL_INVITE, cancelInviteAsync);
}
