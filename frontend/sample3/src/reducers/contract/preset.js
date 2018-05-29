import { handleActions } from 'redux-actions';

import {
  getPreset
} from 'actions';

const preset = handleActions({
  [getPreset](state = {}, action) {
    return action.payload || {};
  }
}, {});

export default preset;
