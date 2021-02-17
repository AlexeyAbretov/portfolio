import { createSelector } from 'reselect';
import { getState } from 'selectors';

/** Возвращает список всех feature toggles */
export const getFeatureToggles = createSelector(
    [getState],
    (state) => state.featureToggles || []
);

/** Возвращает список отключенных feature toggles */
export const getDisabledFeatureToggles = createSelector(
    [getFeatureToggles],
    (toggles) => toggles?.filter(
        (x) => !x.enabled)
        .map((x) => x.name)
);

/** Возвращает список подключенных feature toggles */
export const getEnabledFeatureToggles = createSelector(
    [getFeatureToggles],
    (toggles) => toggles?.filter(
        (x) => x.enabled)
        .map((x) => x.name)
);

import { createSelector } from 'reselect';
import { getState } from 'selectors';

/** Возвращает стейт подсказок*/
export const getSuggests = createSelector(
    [getState],
    state => state.suggests || {}
);

/** Возвращает подсказки для ФИО */
export const getFullNameSuggestions = createSelector(
    [getSuggests],
    state => (state.fullName || {}).payload || []
);

/** Возвращает подсказки для организаций */
export const getOrganizationSuggests = createSelector(
    [getSuggests],
    suggests => (suggests.organization || {}).payload || []
);

/** Возвращает подсказки для адресов */
export const getAddressSuggestions = createSelector(
    [getSuggests],
    state => (state.address || {}).payload || []
);
