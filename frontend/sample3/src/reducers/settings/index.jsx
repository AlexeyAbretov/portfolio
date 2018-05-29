import {
  GET_MANAGE_NUMBERS,
  ADD_ACCOUNT_TO_CURRENT_AWAITER,
  CREATE_LINK_REQUEST_AWAITER,
  DELETE_ACCOUNT_SUCCESS,
  CHANGE_DEFAULT_SSO_LOGIN_SUCCESS,
  ACCEPT_REQUEST_AWAITER,
  REJECT_REQUEST_AWAITER,
  CANCEL_REQUEST_AWAITER,
  ACCEPT_INVITE_AWAITER,
  REJECT_INVITE_AWAITER,
  CANCEL_INVITE_AWAITER,
  BLOCK_ACCOUNT_AWAITER,
  GET_LOGIN_INFO_AWAITER,
  ENABLE_REQUEST_TO_LINK_SUCCESS,
  OperationStatus
} from '../../consts';

const defaultState = {
  manageAccounts: [],
  profileAccess: {},
  recommendations: [],
  outgoingRequests: [],
  incomingInvites: [],
  sharedData: {},
  loginInfo: {},
  loginInfoAwaiter: {},
  addAccountToCurrentAwaiter: {},
  createLinkRequestAwaiter: {},
  reset: false
};

const settings = (state = defaultState, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case GET_MANAGE_NUMBERS: {
      const result = Object.assign(state, action.data);
      result.reset = false;
      return result;
    }
    case DELETE_ACCOUNT_SUCCESS:
      if (action.data.isCurrentAccSlave) {
        newState.profileAccess.accounts = (state.profileAccess.accounts || [])
          .filter(x => x.name !== action.data.linkedLogin);
      } else {
        newState.manageAccounts = state.manageAccounts
          .filter(x => x.name !== action.data.linkedLogin);
      }
      return newState;

    case CHANGE_DEFAULT_SSO_LOGIN_SUCCESS:
      newState.activeNumber = action.data;
      newState.manageAccounts = state.manageAccounts.map((x) => {
        const account = x;
        account.ssoLoginDefault = account.ctn === action.data;
        return account;
      }).sort(a => (
        a.ssoLoginDefault === false ? 1 : 0
      ));
      return newState;

    case ENABLE_REQUEST_TO_LINK_SUCCESS:
      newState.profileAccess.requestToLinkEnable = action.data;
      return newState;

    case ACCEPT_REQUEST_AWAITER:
    case REJECT_REQUEST_AWAITER:
      if (action.data.status === OperationStatus.Success) {
        window.location.reload(true);
        return newState;
      }
      newState.outgoingRequests = state.outgoingRequests.map((x) => {
        if (x.initiatorName === action.data.initiatorName) {
          const item = { ...x };
          item.awaiter = { status: action.data.status };
          return item;
        }
        return x;
      });
      return newState;
    case CANCEL_REQUEST_AWAITER:
      newState.outgoingRequests = state.outgoingRequests.map((x) => {
        if (x.destinationName === action.data.destinationName) {
          const item = { ...x };
          item.awaiter = { status: action.data.status };
          return item;
        }
        return x;
      });
      return newState;

    case ACCEPT_INVITE_AWAITER:
    case REJECT_INVITE_AWAITER:
      if (action.data.status === OperationStatus.Success) {
        window.location.reload(true);
        return newState;
      }
      newState.incomingInvites = state.incomingInvites.map((x) => {
        if (x.initiatorName === action.data.initiatorName) {
          const item = { ...x };
          item.awaiter = { status: action.data.status };
          return item;
        }
        return x;
      });
      return newState;
    case CANCEL_INVITE_AWAITER:
      newState.outgoingRequests = state.outgoingRequests.map((x) => {
        if (x.initiatorName === action.data.initiatorName) {
          const item = { ...x };
          item.awaiter = { status: action.data.status };
          return item;
        }
        return x;
      });
      return newState;

    case BLOCK_ACCOUNT_AWAITER:
      newState.manageAccounts = state.manageAccounts.map((x) => {
        if (x.name === action.data.login) {
          const item = { ...x };
          item.awaiter = { status: action.data.status };
          item.requestId = action.data.requestId;
          return item;
        }
        return x;
      });
      return newState;

    case GET_LOGIN_INFO_AWAITER:
      if (action.data.result) {
        const loginInfo = { ...state.loginInfo };
        loginInfo[action.data.result.login] = action.data.result;
        newState.loginInfo = loginInfo;
      }
      newState.loginInfoAwaiter = { status: action.data.status, login: action.data.login };
      return newState;

    case ADD_ACCOUNT_TO_CURRENT_AWAITER:
      if (action.data.status === OperationStatus.Success) {
        newState.loginInfoAwaiter = {};
        newState.loginInfo[action.data.login] = null;
        newState.reset = true;
      }
      newState.addAccountToCurrentAwaiter = action.data;
      return newState;

    case CREATE_LINK_REQUEST_AWAITER:
      if (action.data.status === OperationStatus.Success) {
        newState.loginInfoAwaiter = {};
        newState.loginInfo[action.data.login] = null;
        newState.reset = true;
      }
      newState.createLinkRequestAwaiter = action.data;
      return newState;

    default:
  }

  return state;
};

export default settings;
