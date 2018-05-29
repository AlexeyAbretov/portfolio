import {
  GET_MANAGE_CREDENTIALS,
  CHANGE_LOGIN_AWAITER,
  CHANGE_PASSWORD_AWAITER
} from '../../consts';

const credentials = (
  state = {
    changeLoginAwaiter: {},
    changePasswordAwaiter: {},
    loginData: {},
    changePasswordList: []
  }, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case GET_MANAGE_CREDENTIALS:
      return Object.assign(state, action.data);
    case CHANGE_LOGIN_AWAITER:
      newState.loginData = { ...state.loginData };
      newState.loginData.nickName = action.data.alias;
      newState.loginData.alias = action.data.alias;
      newState.loginData.isNotificationVisible = action.data.isNotificationVisible;
      newState.changeLoginAwaiter = { status: action.data.status };
      return newState;
    case CHANGE_PASSWORD_AWAITER:
      newState.changePasswordAwaiter = { status: action.data.status };
      newState.changePasswordResult = action.data.result;
      return newState;
    default:
  }

  return state;
};

export default credentials;
