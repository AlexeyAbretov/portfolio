import { handleActions } from 'redux-actions';

import actions, { initState } from 'symbiotes/activity';

export default handleActions({
  [actions.presets.setup.pending]: state => ({
    ...state,
    loading: true
  }),
  [actions.presets.setup.success]: (state, presetId) => ({
    ...state,
    presetId,
    loading: false
  }),
  [actions.presets.setup.error]: state => ({
    ...state,
    loading: false
  })
}, initState);
