import { all } from 'redux-saga/effects';

import open from './open';
import close from './close';

import console from './tv/console';
import wifi from './wifi';
import antivir from './antivir';

export default function* rootSaga() {
  yield all([
    open(),
    close(),
    wifi(),
    antivir(),
    console()
  ]);
}
