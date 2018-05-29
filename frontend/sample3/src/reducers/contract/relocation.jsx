import {
  SHOW_RELOCATION_DIALOG,
  CLOSE_RELOCATION_DIALOG,
  FETCH_STREETS_SUCCESS,
  FETCH_HOUSES_SUCCESS,
  CREATE_RELOCATION_REQUEST_FAIL,
} from 'consts';

const defaultState = {
  isVisible: false,
  streets: [],
  houses: [],
  showError: false
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case (SHOW_RELOCATION_DIALOG): {
      return {
        ...defaultState,
        isVisible: true
      };
    }
    case (CLOSE_RELOCATION_DIALOG): {
      return {
        ...defaultState,
        reloadPage: true
      };
    }
    case (FETCH_STREETS_SUCCESS): {
      return {
        ...state,
        streets: action.payload
      };
    }
    case (FETCH_HOUSES_SUCCESS): {
      return {
        ...state,
        houses: action.payload
      };
    }
    case (CREATE_RELOCATION_REQUEST_FAIL): {
      return {
        ...state,
        showError: true
      };
    }
    default: {
      return state;
    }
  }
}
