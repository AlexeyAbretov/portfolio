/* eslint arrow-parens:0 */

import { put, takeEvery } from 'redux-saga/effects';
import {
  GET_LOGIN_INFO,
  ADD_ACCOUNT_TO_CURRENT,
  CREATE_LINK_REQUEST,
  TOP_MENU_SETTINGS_ITEM_ID,
  LoginInfoType,
  OperationStatus,
  UssErrorMessages } from '../../consts';
import {
    getLoginInfoAwaiter,
    addAccountToCurrentAwaiter,
    createLinkRequestAwaiter,
    selectingMenuItem
  } from '../../actions';
import api from '../api';

function* getLoginInfoAsync(action) {
  yield put(getLoginInfoAwaiter({ status: OperationStatus.Pending, login: action.data }));

  try {
    const loginInfo = yield api.getLoginInfo(action.data);
    const result = { login: action.data, exist: false, isMobile: false, isFttb: false };

    if (loginInfo && loginInfo.length > 0) {
      result.exist = true;
      loginInfo.forEach(info => {
        if (info.type === LoginInfoType.B2C) {
          result.isMobile = true;
        }
        if (info.type === LoginInfoType.FTTB) {
          result.isFttb = true;
        }
      });
      yield put(getLoginInfoAwaiter({ status: OperationStatus.Success, login: action.data, result }));
    } else {
      yield put(getLoginInfoAwaiter({ status: OperationStatus.Fail, login: action.data, result }));
    }
  } catch (e) {
    yield put(getLoginInfoAwaiter({ status: OperationStatus.Fail, login: action.data, result: {} }));
    throw e;
  }
}

function* addAccountAsync(action) {
  const { login, password, userType } = { ...action.data };
  yield put(addAccountToCurrentAwaiter({ status: OperationStatus.Pending, login }));

  try {
    const result = yield api.linkByLoginPassword(login, password, userType);
    if (result.isSucceeded) {
      yield put(addAccountToCurrentAwaiter({ status: OperationStatus.Success, login }));
      yield put(selectingMenuItem(TOP_MENU_SETTINGS_ITEM_ID));
    } else {
      const message = UssErrorMessages[result.meta.code];
      yield put(addAccountToCurrentAwaiter({ status: OperationStatus.Fail, login, message }));
    }
  } catch (e) {
    yield put(addAccountToCurrentAwaiter({ status: OperationStatus.Fail, login }));
    throw e;
  }
}

function* createLinkRequestAsync(action) {
  const { login, userType } = { ...action.data };
  yield put(createLinkRequestAwaiter({ status: OperationStatus.Pending, login }));

  try {
    const result = yield api.createLinkRequest(login, userType);
    if (result.isSucceeded) {
      yield put(createLinkRequestAwaiter({ status: OperationStatus.Success, login, requestId: result.requestId }));
      yield put(selectingMenuItem(TOP_MENU_SETTINGS_ITEM_ID));
    } else {
      const message = UssErrorMessages[result.meta.code];
      yield put(createLinkRequestAwaiter({ status: OperationStatus.Fail, login, message }));
    }
  } catch (e) {
    yield put(createLinkRequestAwaiter({ status: OperationStatus.Fail, login }));
    throw e;
  }
}

export default function* () {
  yield takeEvery(GET_LOGIN_INFO, getLoginInfoAsync);
  yield takeEvery(ADD_ACCOUNT_TO_CURRENT, addAccountAsync);
  yield takeEvery(CREATE_LINK_REQUEST, createLinkRequestAsync);
}
