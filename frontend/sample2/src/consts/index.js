export const FormState = {
    Default: 'default',
    Success: 'success',
    Fail: 'fail'
};

export const ConnectionState = {
    None: 0,

    Available: 1,

    InUse: 2
};

export const CheckState = {
    Success: 'success',
    HouseFail: 'houseFail',
    FlatFail: 'flatFail'
};

export const SET_FORM_STATE = 'SET_FORM_STATE';
export const SET_CHECK_STATE = 'SET_CHECK_STATE';
export const SENDING_REQUEST = 'SENDING_REQUEST';

export const CHANGING_REGION = 'CHANGING_REGION';
export const SET_REGION = 'CHANGED_REGION';

export const CHANGING_PHONE = 'CHANGING_PHONE';
export const SET_PHONE = 'SET_PHONE';

export const CHANGING_FLAT = 'CHANGING_FLAT';
export const SET_FLAT = 'SET_FLAT';

export const CHANGING_STREET = 'CHANGING_STREET';
export const SET_STREET = 'SET_STREET';
export const CHANGING_HOUSE = 'CHANGING_HOUSE';
export const SET_HOUSE = 'SET_HOUSE';

export const SET_SELECTED = 'SET_SELECTED';

export const LOADING_STREETS = 'LOADING_STREETS';
export const STREETS_LOADED = 'STREETS_LOADED';

export const LOADING_HOUSES = 'LOADING_HOUSES';
export const HOUSES_LOADED = 'HOUSES_LOADED';

export const SET_FORM_VALID_STATE = 'SET_FORM_VALID_STATE';
export const SET_FORM_INPUT_FOCUS = 'SET_FORM_INPUT_FOCUS';

export const SET_REQUEST_ID = 'SET_REQUEST_ID';

export const KeyCodes = {
    Up: 38,
    Down: 40,
    Enter: 13
};

export const FocusState = {
    None: 0,

    City: 1,

    Street: 2,

    House: 3,

    Flat: 4,

    Phone: 5,

    Button: 6
};
