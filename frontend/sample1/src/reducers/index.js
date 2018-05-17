import { combineReducers } from 'redux';

import changes from './changes';
import popups from './popups';

import activity from './activity';

export default combineReducers({
  options: (state = {}) => state,
  presets: (state = []) => state,
  changes,
  popups,
  activity
});
