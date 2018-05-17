import { combineReducers } from 'redux';

import {
    SET_FORM_STATE,
    SET_CHECK_STATE,

    SET_PHONE,
    SET_FLAT,
    CHANGING_FLAT,
    SET_HOUSE,
    SET_STREET,

    STREETS_LOADED,
    HOUSES_LOADED,

    SET_FORM_VALID_STATE,
    SET_FORM_INPUT_FOCUS,

    SET_REQUEST_ID,
    SET_REGION,
    SET_SELECTED,

    FormState,
    CheckState
} from 'consts';

const $id = (state = '') => state;
const settings = (state = {}) => state;
const regions = (state = []) => state;
const formState = (state = FormState.Default, action) => {
    switch (action.type) {
        case SET_FORM_STATE:
            return action.state;
        default:
    }

    return state;
};

const streets = (state = [], action) => {
    switch (action.type) {
        case STREETS_LOADED:
            return action.items;
        default:
    }

    return state;
};

const houses = (state = [], action) => {
    switch (action.type) {
        case HOUSES_LOADED:
            return action.items;
        default:
    }

    return state;
};

const selected = (state = {}, action) => {
    switch (action.type) {
        case SET_PHONE:
            return {
                ...state,
                phone: action.val
            };
        case SET_FLAT:
        case CHANGING_FLAT:
            return {
                ...state,
                flat: action.val
            };
        case SET_STREET:
            return {
                ...state,
                streetId: action.id,
                streetTitle: action.title
            };
        case SET_HOUSE:
            return {
                ...state,
                houseId: action.id,
                houseTitle: action.title
            };
        case SET_REGION:
            return {
                ...state,
                regionTitle: action.title,
                regionId: action.id,
            };
        case SET_SELECTED:
            return {
                ...action.selected
            };
        default:
    }

    return state;
};

const isFormValid = (state = false, action) => {
    switch (action.type) {
        case SET_FORM_VALID_STATE:
            return action.state;
        default:
    }

    return state;
};

const focusState = (state = null, action) => {
    switch (action.type) {
        case SET_FORM_INPUT_FOCUS:
            return action.state;
        default:
    }

    return state;
};

const requestId = (state = null, action) => {
    switch (action.type) {
        case SET_REQUEST_ID:
            return action.id;
        default:
    }

    return state;
};

const checkState = (state = CheckState.Success, action) => {
    switch (action.type) {
        case SET_CHECK_STATE:
            return action.state;
        default:
    }

    return state;
};

export default combineReducers({
    $id,
    settings,
    formState,
    selected,
    isFormValid,
    regions,
    streets,
    houses,
    focusState,
    requestId,
    checkState
});
