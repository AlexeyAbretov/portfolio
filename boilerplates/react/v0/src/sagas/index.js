import popups from './popups';

export default function* rootSaga() {
  yield [
    popups()
  ];
}
