import { put, select, takeEvery } from 'redux-saga/effects';
import { CHANGE_MANAGE_IP_TV, OperationStatus } from '../../consts';
import { changeManageIpTvAwaiter } from '../../actions';
import api from '../api';

function* changeManageIpTvAsync(action) {
  yield put(changeManageIpTvAwaiter({ status: OperationStatus.Pending, consoleId: action.data.consoleId }));

  try {
    const changeManageIpTvResult = yield api.changeManageIpTv(action.data);
    if (changeManageIpTvResult.isSucceeded === true) {
      let manageIpTv = yield select(state => state.manageIpTv);
      manageIpTv = { ...manageIpTv };
      manageIpTv.consoles = manageIpTv.consoles.map((x) => {
        if (x.consoleId === action.data.consoleId) {
          return action.data;
        }
        return x;
      });
      yield put(changeManageIpTvAwaiter({
        status: OperationStatus.Success,
        consoleId: action.data.consoleId,
        result: manageIpTv
      }));
    } else {
      yield put(changeManageIpTvAwaiter({ status: OperationStatus.Fail, consoleId: action.data.consoleId }));
    }
  } catch (e) {
    yield put(changeManageIpTvAwaiter({ status: OperationStatus.Fail, consoleId: action.data.consoleId }));
    throw e;
  }
}

export default function* () {
  yield takeEvery(CHANGE_MANAGE_IP_TV, changeManageIpTvAsync);
}
