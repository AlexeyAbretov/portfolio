import { all } from 'redux-saga/effects';

import open from './open';
import close from './close';

export default function* rootSaga() {
  yield all([
    open(),
    close()
  ]);
}
