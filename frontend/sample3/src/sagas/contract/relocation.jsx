import { put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import {
  fetchStreetsSuccess,
  fetchHousesSuccess,
  createRelocationRequestFail,
  closeRelocationDialog
} from 'actions';
import { FETCH_STREETS, FETCH_HOUSES, CREATE_RELOCATION_REQUEST } from 'consts';
import api from '../api';

function* fetchStreetsAsync(action) {
  try {
    const data = yield api.getStreets(action.payload);
    if (data) {
      yield put(fetchStreetsSuccess(data));
    } else {
      yield put(fetchStreetsSuccess([]));
    }
  } catch (e) {
    yield put(fetchStreetsSuccess([]));
  }
}

function* fetchHousesAsync(action) {
  try {
    const data = yield api.getHouses(action.payload.streetId, action.payload.term);
    if (data) {
      yield put(fetchHousesSuccess(data));
    } else {
      yield put(fetchHousesSuccess([]));
    }
  } catch (e) {
    yield put(fetchHousesSuccess([]));
  }
}

function* createRelocationRequestAsync(action) {
  try {
    const data = yield api.createRelocationRequest(action.payload);
    if (data && data.requestId) {
      yield put(closeRelocationDialog());
    } else {
      yield put(createRelocationRequestFail());
    }
  } catch (e) {
    yield put(createRelocationRequestFail());
  }
}

function* watchFetchStreetsAsync() {
  yield takeLatest(FETCH_STREETS, fetchStreetsAsync);
}

function* watchFetchHousesAsync() {
  yield takeLatest(FETCH_HOUSES, fetchHousesAsync);
}

function* watchCreateRelocationRequestAsync() {
  yield takeEvery(CREATE_RELOCATION_REQUEST, createRelocationRequestAsync);
}

export default function* () {
  yield all([
    watchFetchStreetsAsync(),
    watchFetchHousesAsync(),
    watchCreateRelocationRequestAsync(),
  ]);
}
