import { createSelector } from 'reselect';

export const getOptions = state => state.options || {};

export const getTvSubscriptionsWordForms = createSelector(
    [getOptions],
    options => options.tvSubscriptionsWordForms || '{0}'
);

export const getTvEquipmentsValueText = createSelector(
    [getOptions],
    options => options.tvEquipmentsValueText || '{0} {1}'
);

export const getTvChannelsWordForms = createSelector(
    [getOptions],
    options => options.tvChannelsWordForms || '{0}'
);
