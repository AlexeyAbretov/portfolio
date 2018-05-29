import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';

import reducer from 'reducers';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export default (preloadedState) => {
  let store = null;
  /* eslint-disable no-underscore-dangle */
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(
      reducer,
      preloadedState,
      composeEnhancers(applyMiddleware(sagaMiddleware)));
  /* eslint-enable */
  } else {
    store = createStore(
      reducer,
      preloadedState,
      applyMiddleware(sagaMiddleware));
  }

  sagaMiddleware.run(rootSaga);

  if (typeof window !== 'undefined') {
    syncHistoryWithStore(
      createHistory(),
      store
    );
  }

  return store;
};
