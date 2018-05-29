import { handleActions } from 'redux-actions';

import {
    OperationStatus
} from 'consts';

import actions, { initState } from 'symbiotes/activity';

export default handleActions({
  [actions.activity.pending]: state => ({
    ...state,
    status: OperationStatus.Pending
  }),
  [actions.activity.fail]: state => ({
    ...state,
    status: OperationStatus.Fail
  }),
  [actions.activity.success]: (state, action) => {
    const [name, status] = action.payload || [];

    if (!name) {
      return state;
    }

    const opened = state.opened || [];

    let activity = opened.find(x => x.name === name);

    if (!activity) {
      activity = {
        name,
        status
      };
    } else {
      activity = {
        ...activity,
        status
      };
    }

    return {
      activities: [
        ...opened.filter(x => x.name !== name),
        activity
      ],
      status: OperationStatus.Default
    };
  }
}, initState);
