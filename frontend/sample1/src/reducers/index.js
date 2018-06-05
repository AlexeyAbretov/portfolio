import { combineReducers } from 'redux';

import changes from './changes';
import popups from './popups';

import activity from './activity';

export default combineReducers({
  $id: (state = '') => state,
  options: (state = {}) => state,
  presets: (state = []) => state,
  services: (state = []) => state,
  changes,
  popups,
  activity,
  mappings: (state = {}) => state,
});
