import { createSelector } from 'reselect';

import {
    OperationStatus,
    ActivityNames
} from 'consts';

export const getActivity = state => state.activity || {};

export const getActivityStatus = createSelector(
    [getActivity],
    activity => activity.status || OperationStatus.Default
);

export const getCurrentActivities = createSelector(
    [getActivity],
    activity => activity.activities || []
);

export const getToggleChangeBlockActivity = createSelector(
    [getCurrentActivities],
    opened => opened.find(x => x.name === ActivityNames.Tv.ToggleChangeBlock) || {}
);
