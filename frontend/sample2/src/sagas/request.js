import { delay } from 'redux-saga';
import { call, all, put, select, takeEvery } from 'redux-saga/effects';

import {
    SENDING_REQUEST,

    CHANGING_PHONE,
    CHANGING_FLAT,

    CHANGING_STREET,
    CHANGING_HOUSE,
    CHANGING_REGION,
    LOADING_STREETS,
    LOADING_HOUSES,

    FormState,
    FocusState,
    CheckState,
    ConnectionState
} from 'consts';

import {
    setFormState,
    setCheckState,

    setFormValidState,
    setFormInputFocus,

    setFlat,
    setPhone,
    setSelected,

    streetsLoaded,
    housesLoaded,

    setRequestId
} from 'actions';

import api from './api';

function* sendingRequest(options) {
    try {
        const isValid = yield validateForm();
        if (!isValid) {
            return;
        }

        /// #if FAKE
        yield delay(2000);
        /// #endif

        const [flat, phone, houseId, url] = yield all([
            select(state => state.selected.flat),
            select(state => state.selected.phone),
            select(state => state.selected.houseId),
            select(state => state.settings.sendRequestUrl)
        ]);

        const result = yield api.sendRequest(
            houseId,
            flat,
            phone.replace('+7', ''),
            url);

        if (!result.hasError) {
            yield all([
                put(setRequestId(result.requestId)),
                put(setFormState(FormState.Success))
            ]);
        } else {
            yield put(setFormState(FormState.Fail));
        }

        /// #if FAKE
        yield delay(10000);
        yield put(setFormState(FormState.Default));
        /// #endif
    } catch (e) {
        console.log(e);
    }
};

function* validateForm() {
    let isValid = false;

    const [phone, flat, streetId, houseId] = yield all([
        select(state => state.selected.phone),
        select(state => state.selected.flat),
        select(state => state.selected.streetId),
        select(state => state.selected.houseId)
    ]);

    if (phone && phone.length === 12 && flat && streetId && houseId) {
        isValid = true;
    }

    return isValid;
};

function* changingFlat(options) {
    try {
        const flat = options.val;

        if (!options.checkState || !flat) {
            yield put(setFlat(flat));
            const isValid = yield validateForm();
            yield put(setFormValidState(isValid));
            return;
        }

        const [houseId, url] = yield all([
            select(state => state.selected.houseId),
            select(state => state.settings.checkConnectionUrl)
        ]);

        const result = yield api.checkAddress(
            houseId, flat, url);

        if (result.connectionState === ConnectionState.Available) {
            yield put(setFlat(flat));
            const isValid = yield validateForm();
            yield put(setFormValidState(isValid));
            yield put(setCheckState(CheckState.Success));
        } else {
            yield all([
                put(setFormInputFocus(FocusState.None)),
                put(setCheckState(CheckState.FlatFail)),
                put(setFormValidState(false))
            ]);
        }
    } catch (e) {
        console.log(e);
    }
}

function* changingPhone(options) {
    try {
        yield put(setPhone(options.val));
        const isValid = yield validateForm();
        yield put(setFormValidState(isValid));

        if (isValid && options.changeFocus) {
            yield put(setFormInputFocus(FocusState.Button));
        }
    } catch (e) {
        console.log(e);
    }
}

function* loadingStreets(options) {
    try {
        if (!options.term || options.term.length < 3) {
            yield put(streetsLoaded([]));

            const selected = yield select(state => state.selected);
            const newSelected = {
                ...selected,
                streetTitle: null,
                streetId: null,
                houseTitle: null,
                houseId: null,
                flat: null
            };

            yield put(setSelected(newSelected));

            yield put(setFormValidState(false));
        } else {
            const url = yield select(state => state.settings.getStreetsUrl);
            const streets = yield api.getStreets(
                options.cityName, options.cityId, options.term, url);
            yield put(streetsLoaded(streets || []));
        }
    } catch (e) {
        console.log(e);
    }
}

function* loadingHouses(options) {
    try {
        if (!options.term || options.term.length < 1) {
            yield put(housesLoaded([]));

            const selected = yield select(state => state.selected);
            const newSelected = {
                ...selected,
                houseTitle: null,
                houseId: null,
                flat: null
            };

            yield put(setSelected(newSelected));
            yield put(setFormValidState(false));
        } else {
            const url = yield select(state => state.settings.getHousesUrl);
            const houses = yield api.getHouses(
                options.streetId, options.term, url);
            yield put(housesLoaded(houses || []));
        }
    } catch (e) {
        console.log(e);
    }
}

function* changingRegion(options) {
    try {
        const selected = yield select(state => state.selected);
        const newSelected = {
            ...selected,
            regionId: options.id,
            regionTitle: options.title,
            streetTitle: null,
            streetId: null,
            houseTitle: null,
            houseId: null,
            flat: null
        };

        yield put(setSelected(newSelected));
        yield put(setFormValidState(false));
        yield put(setFormInputFocus(FocusState.Street));
    } catch (e) {
        console.log(e);
    }
};

function* changingStreet(options) {
    try {
        const selected = yield select(state => state.selected);
        const newSelected = {
            ...selected,
            streetTitle: options.title,
            streetId: options.id,
            houseTitle: null,
            houseId: null,
            flat: null
        };

        yield put(setSelected(newSelected));
        yield put(setFormValidState(false));
        yield put(setFormInputFocus(FocusState.House));
    } catch (e) {
        console.log(e);
    }
};

function* changingHouse(options) {
    try {
        const { id } = options;
        const currentHouse = yield select(
            state => (state.houses || []).filter(x => x.id === id));
        const result = yield api.checkHouseConnection(
            currentHouse[0] || {});

        const selected = yield select(state => state.selected);
        const newSelected = {
            ...selected,
            houseTitle: options.title,
            houseId: options.id,
            flat: null
        };

        yield put(setSelected(newSelected));
        yield put(setFormValidState(false))

        if (result) {
            yield all([
                put(setFormInputFocus(FocusState.Flat)),
                put(setCheckState(CheckState.Success))
            ]);
        } else {
            yield all([
                put(setFormInputFocus(FocusState.None)),
                put(setCheckState(CheckState.HouseFail))
            ]);
        }
    } catch (e) {
        console.log(e);
    }
};

export default function* () {
    yield all([
        takeEvery(SENDING_REQUEST, sendingRequest),

        takeEvery(CHANGING_PHONE, changingPhone),
        takeEvery(CHANGING_FLAT, changingFlat),

        takeEvery(CHANGING_REGION, changingRegion),
        takeEvery(CHANGING_STREET, changingStreet),
        takeEvery(CHANGING_HOUSE, changingHouse),

        takeEvery(LOADING_STREETS, loadingStreets),
        takeEvery(LOADING_HOUSES, loadingHouses)
    ]);
};
