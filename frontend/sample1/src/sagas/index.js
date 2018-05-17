import services from './services';
import popups from './popups';
import presets from './presets';

export default function* rootSaga() {
  yield [
    services(),
    popups(),
    presets()
  ];
}
