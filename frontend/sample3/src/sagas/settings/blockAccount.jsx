import { put, takeEvery } from 'redux-saga/effects';
import { BLOCK_ACCOUNT, OperationStatus } from '../../consts';
import { blockAccountAwaiter } from '../../actions';
import api from '../api';

function* blockAccountAsync(action) {
  yield put(blockAccountAwaiter({ status: OperationStatus.Pending, login: action.data.login }));

  try {
    let result;
    if (action.data.isMobile === true) {
      result = yield api.mobileBlockAccount(action.data.ctn, action.data.from);
    } else {
      result = yield api.blockAccount(action.data.from, action.data.to, action.data.login);
    }
    if (result) {
      yield put(blockAccountAwaiter({ status: OperationStatus.Success, login: action.data.login, requestId: result }));
    } else {
      yield put(blockAccountAwaiter({ status: OperationStatus.Fail, login: action.data.login }));
    }
  } catch (e) {
    yield put(blockAccountAwaiter({ status: OperationStatus.Fail, login: action.data.login }));
    throw e;
  }
}

export default function* () {
  yield takeEvery(BLOCK_ACCOUNT, blockAccountAsync);
}
