/* eslint arrow-parens:0 */

import { put, takeEvery } from 'redux-saga/effects';
import { ACCEPT_REQUEST, REJECT_REQUEST, CANCEL_REQUEST, OperationStatus } from '../../consts';
import {
    acceptRequestAwaiter,
    rejectRequestAwaiter,
    cancelRequestAwaiter
  } from '../../actions';
import api from '../api';

function* acceptRequestAsync(action) {
  yield put(acceptRequestAwaiter({ status: OperationStatus.Pending, initiatorName: action.data }));

  try {
    const result = yield api.acceptRequest(action.data);
    if (result.isSucceeded === true) {
      yield put(acceptRequestAwaiter({ status: OperationStatus.Success, initiatorName: action.data }));
    } else {
      yield put(acceptRequestAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    }
  } catch (e) {
    yield put(acceptRequestAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    throw e;
  }
}

function* rejectRequestAsync(action) {
  yield put(rejectRequestAwaiter({ status: OperationStatus.Pending, initiatorName: action.data }));

  try {
    const result = yield api.rejectRequest(action.data);
    if (result.isSucceeded === true) {
      yield put(rejectRequestAwaiter({ status: OperationStatus.Success, initiatorName: action.data }));
    } else {
      yield put(rejectRequestAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    }
  } catch (e) {
    yield put(rejectRequestAwaiter({ status: OperationStatus.Fail, initiatorName: action.data }));
    throw e;
  }
}

function* cancelRequestAsync(action) {
  yield put(cancelRequestAwaiter({ status: OperationStatus.Pending, destinationName: action.data }));

  try {
    const result = yield api.cancelRequest(action.data);
    if (result.isSucceeded === true) {
      yield put(cancelRequestAwaiter({ status: OperationStatus.Success, destinationName: action.data }));
    } else {
      yield put(cancelRequestAwaiter({ status: OperationStatus.Fail, destinationName: action.data }));
    }
  } catch (e) {
    yield put(cancelRequestAwaiter({ status: OperationStatus.Fail, destinationName: action.data }));
    throw e;
  }
}

export default function* () {
  yield takeEvery(ACCEPT_REQUEST, acceptRequestAsync);
  yield takeEvery(REJECT_REQUEST, rejectRequestAsync);
  yield takeEvery(CANCEL_REQUEST, cancelRequestAsync);
}
