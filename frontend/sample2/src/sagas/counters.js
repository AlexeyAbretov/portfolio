import { all, call, select, takeEvery } from 'redux-saga/effects';

import {
    CHANGING_PHONE,
    CHANGING_REGION,
    CHANGING_STREET,
    CHANGING_HOUSE,
    CHANGING_FLAT,
    SET_FORM_STATE,
    FormState
} from 'consts';

const fields = {
    city: 'city',
    street: 'street',
    house: 'house',
    flat: 'flat',
    phone: 'phone'
};

const pushChangeEvent = (fieldName) => {
    if (typeof RequestsGtmCounters === 'undefined' || !fieldName) {
        return;
    }

    const getAction = function (name) {
        switch (name) {
            case fields.street:
                return RequestsGtmCounters.actions.newStreet;
            case fields.house:
                return RequestsGtmCounters.actions.newHouse;
            case fields.flat:
                return RequestsGtmCounters.actions.newFlat;
            case fields.phone:
                return RequestsGtmCounters.actions.phone;
            case fields.name:
                return RequestsGtmCounters.actions.name;
            default:
                return '';
        }
    }

    RequestsGtmCounters.change.add(getAction(fieldName));
}

const pushSuccessEvent = function (title, requestId) {
    if (typeof RequestsGtmCounters === 'undefined') {
        return;
    }

    const data = {
        title,
        orderId: requestId
    };

    RequestsGtmCounters.home.addSuccess(data);
}

const pushFailEvent = function (title) {
    if (typeof RequestsGtmCounters === 'undefined') {
        return;
    }

    const data = {
        title
    };

    RequestsGtmCounters.home.addFail(data);
}

function* changingPhone(options) {
    try {
        const isValid = yield select(
            state => state.isFormValid || false);

        if (isValid && options.changeFocus) {
            yield call(pushChangeEvent, fields.phone);
        }
    } catch (e) {
        console.log(e);
    }
}

function* changingRegion(options) {
    try {
        yield call(pushChangeEvent, fields.city);
    } catch (e) {
        console.log(e);
    }
}

function* changingFlat(options) {
    try {
        yield call(pushChangeEvent, fields.flat);
    } catch (e) {
        console.log(e);
    }
}

function* changingStreet(options) {
    try {
        yield call(pushChangeEvent, fields.street);
    } catch (e) {
        console.log(e);
    }
}

function* changingHouse(options) {
    try {
        yield call(pushChangeEvent, fields.house);
    } catch (e) {
        console.log(e);
    }
}

function* onRequestSent() {
    try {
        const [title, formState, requestId] = yield all([
            select(state => (state.settings || {}).counterItemTitle),
            select(state => state.formState),
            select(state => state.requestId)
        ]);

        if (formState === FormState.Success) {
            yield call(pushSuccessEvent, title, requestId);
        } else {
            yield call(pushFailEvent, title);
        }
        
    } catch (e) {
        console.log(e);
    }
}

export default function* () {
    yield all([
        takeEvery(CHANGING_PHONE, changingPhone),
        takeEvery(CHANGING_FLAT, changingFlat),
        takeEvery(CHANGING_REGION, changingRegion),
        takeEvery(CHANGING_STREET, changingStreet),
        takeEvery(CHANGING_HOUSE, changingHouse),
        takeEvery(SET_FORM_STATE, onRequestSent)
    ]);
};
