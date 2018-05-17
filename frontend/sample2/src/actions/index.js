import {
  SET_FORM_STATE,
  SET_CHECK_STATE,

  SENDING_REQUEST,
  
  CHANGING_PHONE,
  SET_PHONE,
  
  CHANGING_FLAT,
  SET_FLAT,
  
  CHANGING_STREET,
  SET_STREET,
  CHANGING_HOUSE,
  SET_HOUSE,
  CHANGING_REGION,
  SET_REGION,

  LOADING_STREETS,
  STREETS_LOADED,

  LOADING_HOUSES,
  HOUSES_LOADED,

  SET_FORM_VALID_STATE,
  SET_FORM_INPUT_FOCUS,

  SET_REQUEST_ID,
  SET_SELECTED,

  FormState,
  CheckState
} from 'consts';

export function setFormState(state = CheckState.Success) {
  return {
    type: SET_FORM_STATE,
    state
  };
}

export function setCheckState(state = FormState.Default) {
  return {
    type: SET_CHECK_STATE,
    state
  };
}

export function sendingRequest() {
  return {
    type: SENDING_REQUEST
  };
}

export function changingPhone(val, changeFocus = true) {
  return {
    type: CHANGING_PHONE,
    val,
    changeFocus
  };
}

export function setPhone(val) {
  return {
    type: SET_PHONE,
    val
  };
}

export function setSelected(selected) {
  return {
    type: SET_SELECTED,
    selected
  };
}

export function changingStreet(id, title) {
  return {
    type: CHANGING_STREET,
    id,
    title
  };
}

export function setStreet(id, title) {
  return {
    type: SET_STREET,
    id,
    title
  };
}

export function changingHouse(id, title) {
  return {
    type: CHANGING_HOUSE,
    id,
    title
  };
}

export function setHouse(id, title) {
  return {
    type: SET_HOUSE,
    id,
    title
  };
}

export function changingFlat(val, checkState = true) {
  return {
    type: CHANGING_FLAT,
    val,
    checkState
  };
}

export function setFlat(val) {
  return {
    type: SET_FLAT,
    val
  };
}

export function changingRegion(id, title) {
  return {
    type: CHANGING_REGION,
    id,
    title
  };
}

export function setRegion(id, title) {
  return {
    type: SET_REGION,
    id,
    title
  };
}

export function loadingStreets(cityName, cityId, term) {
  return {
    type: LOADING_STREETS,
    cityName,
    cityId,
    term
  };
}

export function streetsLoaded(items) {
  return {
    type: STREETS_LOADED,
    items
  };
}

export function loadingHouses(streetId, term) {
  return {
    type: LOADING_HOUSES,
    streetId,
    term
  };
}

export function housesLoaded(items) {
  return {
    type: HOUSES_LOADED,
    items
  };
}

export function setFormValidState(state) {
  return {
    type: SET_FORM_VALID_STATE,
    state
  };
}

export function setFormInputFocus(state) {
  return {
    type: SET_FORM_INPUT_FOCUS,
    state
  };
}

export function setRequestId(id) {
  return {
    type: SET_REQUEST_ID,
    id
  };
}
