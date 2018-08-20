import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from 'src/reducers';
import rootSaga from 'src/sagas';

/* eslint-disable */
// #if process.env.NODE_ENV !== 'fake'
import services from 'src/services';
// #endif

// #if process.env.NODE_ENV === 'fake'
import services from 'fakes/services';
// #endif
/* eslint-enable */

import createApiMiddleware from 'src/middlewares/api';

/* eslint-disable no-underscore-dangle */
const sagaMiddleware = process.env.NODE_ENV !== 'production' ?
  createSagaMiddleware({
    sagaMonitor: window.__SAGA_MONITOR_EXTENSION__
  }) :
  createSagaMiddleware();
/* eslint-enable */

const apiMiddleware = createApiMiddleware({
  api: services
});

export default (preloadedState) => {
  let store = null;
  /* eslint-disable no-underscore-dangle */
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(
      reducer,
      preloadedState,
      composeEnhancers(applyMiddleware(apiMiddleware, sagaMiddleware))
    );
  /* eslint-enable */
  } else {
    /* eslint-disable no-underscore-dangle */
    if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => { };
    }
    /* eslint-enable */

    store = createStore(
      reducer,
      preloadedState,
      applyMiddleware(apiMiddleware, sagaMiddleware)
    );
  }

  sagaMiddleware.run(rootSaga);

  return store;
};
