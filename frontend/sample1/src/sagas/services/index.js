import { all } from 'redux-saga/effects';

import add from './add';
import remove from './remove';
import toggle from './toggle';

export default function* rootSaga() {
  yield all([
    add(),
    remove(),
    toggle()
  ]);
}
