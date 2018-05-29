import {
  GET_MANAGE_IP_TV,
  CHANGE_MANAGE_IP_TV_AWAITER
} from '../../consts';

const manageIpTv = (state = { hideAwaiter: {} }, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case GET_MANAGE_IP_TV:
      return Object.assign(state, action.data);
    case CHANGE_MANAGE_IP_TV_AWAITER:
      if (action.data.result) {
        newState.consoles = action.data.result.consoles;
      }
      newState.hideAwaiter = { status: action.data.status, consoleId: action.data.consoleId };
      return newState;
    default:
  }
  return newState;
};

export default manageIpTv;
