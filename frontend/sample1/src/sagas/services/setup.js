import { put, takeEvery, call } from 'redux-saga/effects';

import
    actions
from 'symbiotes/activity';

import {
    PopupNames,
    ServiceTypes
} from 'consts';

import
popupsActions
from 'symbiotes/popups';

const getPopupNameByServiceType = (type) => {
  switch (type) {
    case ServiceTypes.TvTariff:
    case ServiceTypes.Tve:
      return PopupNames.Tv;
    case ServiceTypes.Internet:
    case ServiceTypes.Vsu:
      return PopupNames.Inet;
    case ServiceTypes.TvConsole:
      return PopupNames.TvConsole;
    case ServiceTypes.Kasper:
    case ServiceTypes.DrWeb:
    case ServiceTypes.Eset:
      return PopupNames.Antivir;
    case ServiceTypes.WifiRent:
      return PopupNames.WifiRouter;
    default:
      return '';
  }
};

export function* setupService(action = {}) {
  yield put(actions.services.setup.pending());

  try {
    const [{ presetId, serviceId, type } = {}] = action.payload || [];

    const name = yield call(getPopupNameByServiceType, type);
    yield put(popupsActions.popups.open.start(
        name,
        { presetId, serviceId, type }));
    yield put(actions.services.setup.success({
      name, presetId, serviceId
    }));
  } catch (e) {
    yield put(actions.services.setup.error());
        console.log(e); // eslint-disable-line
  }
}

export default function* () {
  yield takeEvery(actions.services.setup.start.toString(), setupService);
}
