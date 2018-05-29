import {
  GET_SOCIAL_ACCOUNTS,
  DELETE_SOCIAL_ACCOUNT_AWAITER,
  SocialType,
  OperationStatus
} from '../../consts';

const socialAccounts = (state = { fbAwaiter: {}, vkAwaiter: {} }, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case GET_SOCIAL_ACCOUNTS: {
      return Object.assign(state, action.data);
    }
    case DELETE_SOCIAL_ACCOUNT_AWAITER:
      if (action.data.socialName === SocialType.FB) {
        newState.fbAwaiter = { status: action.data.status };
        if (action.data.status === OperationStatus.Success) {
          newState.fb = null;
        }
      }
      if (action.data.socialName === SocialType.VK) {
        newState.vkAwaiter = { status: action.data.status };
        if (action.data.status === OperationStatus.Success) {
          newState.vk = null;
        }
      }
      return newState;
    default:
  }
  return state;
};

export default socialAccounts;
