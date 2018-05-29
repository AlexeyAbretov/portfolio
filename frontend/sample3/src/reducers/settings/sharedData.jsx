import {
  GET_SHARED_DATA,
} from '../../consts';

const sharedData = (state = {
  redirectLinks: []
}, action) => {
  switch (action.type) {
    case GET_SHARED_DATA:
      return Object.assign(state, action.data);
    default:
  }

  return state;
};

export default sharedData;
