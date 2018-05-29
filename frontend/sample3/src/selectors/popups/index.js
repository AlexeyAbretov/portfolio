import { createSelector } from 'reselect';

import {
    OperationStatus,
    PopupsNames
} from 'consts';

export const getPopups = state => state.popups || {};

export const getPopupStatus = createSelector(
    [getPopups],
    popups => popups.status || OperationStatus.Default
);

export const getOpenedPopup = createSelector(
    [getPopups],
    popups => popups.opened || []
);

export const getTvChangePopup = createSelector(
    [getOpenedPopup],
    opened => opened.find(x => x.name === PopupsNames.Tv.Change)
);

export const getTvPackagesChangePopup = createSelector(
    [getOpenedPopup],
    opened => opened.find(x => x.name === PopupsNames.Tv.Packages.Change)
);
