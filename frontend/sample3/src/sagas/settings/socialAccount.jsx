import { put, takeEvery } from 'redux-saga/effects';
import { DELETE_SOCIAL_ACCOUNT, OperationStatus } from '../../consts';
import { deleteSocialAccountAwaiter } from '../../actions';
import api from '../api';

export function* deleteSocialAccountAsync(action) {
  yield put(deleteSocialAccountAwaiter({ socialName: action.data.socialName, status: OperationStatus.Pending }));

  try {
    const result = yield api.deleteSocialAccount(action.data.socialId, action.data.socialName);
    if (result.isSucceeded === true) {
      yield put(deleteSocialAccountAwaiter({ socialName: action.data.socialName, status: OperationStatus.Success }));
    } else {
      yield put(deleteSocialAccountAwaiter({ socialName: action.data.socialName, status: OperationStatus.Fail }));
    }
  } catch (e) {
    yield put(deleteSocialAccountAwaiter({ socialName: action.data.socialName, status: OperationStatus.Fail }));
    throw e;
  }
}

export default function* () {
  yield takeEvery(DELETE_SOCIAL_ACCOUNT, deleteSocialAccountAsync);
}
