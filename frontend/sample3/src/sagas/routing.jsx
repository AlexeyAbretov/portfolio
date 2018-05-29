import { put, select, takeEvery, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  TOP_MENU_PROFILE_ITEM_ID,
  TOP_MENU_DETAILS_ITEM_ID,
  TOP_MENU_MESSAGES_ITEM_ID,
  TOP_MENU_SETTINGS_ITEM_ID,
  DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,
  SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID,

  BackwardCompatibility
} from 'consts';

import {
  selectingMessageMenuItem,
  selectDetailsMenuItem,
  selectMenuItem,
  selectingSettingsMenuItem
} from 'actions';

import loadDetailsData from './details/api';
import { loadTopData } from './topMenu';

function* LocationChange(options) {
  try {
    let { baseUrl } = yield select(state => state.urls);

    if (baseUrl[baseUrl.length - 1] !== '/') {
      baseUrl += '/';
    }

    let pathname = options.payload.pathname;
    if (pathname[pathname.length - 1] !== '/') {
      pathname += '/';
    }

    const actions = pathname.replace(baseUrl, '');
    let [top, second] = actions.split('/');

    let params = options.payload.search
      .substring(1)
      .split('&');
    params = params
      .filter(x => !!x)
      .map((val) => {
        const [name, value] = val.split('=');
        return { name, value };
      });

    // support old routing
    if (options.payload.hash && !top && !second) {
      let hash = options.payload.hash
        .replace('#/', '')
        .replace('#', '');

      if (hash[hash.length - 1] === '/') {
        hash = hash.substring(0, hash.length - 1);
      }

      const [bTop, bSecond] = hash.split('/');

      if (!BackwardCompatibility[bTop] ||
        !BackwardCompatibility[bTop][bSecond || 'Index']) {
        [top, second] = actions.split('/');
      } else {
        top = BackwardCompatibility[bTop].Name;
        second = BackwardCompatibility[bTop][bSecond || 'Index'];
      }
    }

    if (!top) {
      top = TOP_MENU_PROFILE_ITEM_ID;
    }

    // load data
    yield call(loadTopData, top, false);

    // set menu item
    yield put(selectMenuItem(top));

    // load sub data
    if (top === TOP_MENU_DETAILS_ITEM_ID) {
      if (!second) {
        second = DETAILS_MENU_OPERATION_HISTORY_ITEM_ID;
      }

      const filter = yield select(
        state => state.detailsFilter[second]);
      yield call(loadDetailsData, second, filter);

      yield put(selectDetailsMenuItem(second));
    } else if (top === TOP_MENU_MESSAGES_ITEM_ID) {
      yield put(selectingMessageMenuItem(second, params));
    } else if (top === TOP_MENU_SETTINGS_ITEM_ID) {
      if (!second) {
        second = SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID;
      }

      yield put(selectingSettingsMenuItem(second));
    }
  } catch (e) {
    throw e;
  }
}

export default function* () {
  yield takeEvery(LOCATION_CHANGE, LocationChange);
}
