import { LOCATION_CHANGE } from 'react-router-redux';

import { SET_NAVIGATION_STATE } from 'consts';

const initialState = { locationBeforeTransitions: null };

export default (state = initialState, action) => {
  // The LOCATION_CHANGE case is copied from react-router-redux/reducer
  if (action.type === LOCATION_CHANGE) {
    return { ...state, locationBeforeTransitions: action.payload };
  }

  // Additional code to change location state in response to your own app's actions
  if (action.type === SET_NAVIGATION_STATE) {
    const { top, second } = action;
    let location = state.locationBeforeTransitions;
    let baseUrl = action.baseUrl;

    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    const pathname = top ?
      `${baseUrl}/${top}/${second || ''}` :
      `${baseUrl}/${second || ''}`;

    let search = null;
    if (action.params) {
      search = action.params.map(item => `${item.name}=${item.value}`).join('&');
    }

    location = { ...location, pathname, search, action: 'PUSH' };

    return { ...state, locationBeforeTransitions: location };
  }

  return state;
};
