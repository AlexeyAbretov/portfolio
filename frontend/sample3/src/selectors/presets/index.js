import { createSelector } from 'reselect';

import {
    ServiceTypes,
    SortDirection,
    DataTypes,
    NumFormats
} from 'consts';

import {
    getTvChannelsWordForms,
    getOptions
} from 'selectors';

import Utils from 'utils';

export const getPreset = state => state.preset || {};

export const getPresetItems = createSelector(
    [getPreset],
    preset => preset.items || []
);

export const getTvConsoles = createSelector(
    [getPresetItems],
    items => items.filter(x => x.type === ServiceTypes.TvConsole &&
        x.inFttbPreset)
);

export const getConnectedTvConsoles = createSelector(
    [getTvConsoles],
    items => items.filter(x => x.connected)
);

export const getMultirooms = createSelector(
    [getPresetItems],
    items => items.filter(x => x.type === ServiceTypes.Multiroom &&
        x.inFttbPreset)
);

export const getReturnEther = createSelector(
    [getPresetItems],
    items => items.filter(x => x.type === ServiceTypes.ReturnEther)
);

export const getConnectedMultirooms = createSelector(
    [getMultirooms],
    items => items.filter(x => x.connected)
);

export const getPresetServices = createSelector(
    [getConnectedMultirooms, getReturnEther, getOptions],
    (connectedMultirooms, returnEthers, options) => {
      let result = [
        ...returnEthers
      ];

      if (connectedMultirooms.length) {
        const multiroom = {
          ...connectedMultirooms[0]
        };

        multiroom.fee = connectedMultirooms
            .reduce((sum, b) => sum + b.fee, 0);

        multiroom.title = options.multiroomText || multiroom.title;

        result = [
          ...result,
          multiroom
        ];
      }

      return Utils.sort(result
        .map(x => ({
          id: x.id,
          title: x.title,
          note: x.description,
          connected: x.connected,
          disabled: x.type === ServiceTypes.Multiroom,
          fee: `${Utils.formatNum(
            x.fee,
            NumFormats.FixedHideZero)} ${options.rubSymbol}/${options.monthText}`
        })),
        SortDirection.Ascending,
        'id',
        DataTypes.String);
    }
);

export const getTvTariffs = createSelector(
    [getPresetItems],
    items => items.filter(x => x.type === ServiceTypes.TvTariff)
);

export const getAvailableTvTariffs = createSelector(
    [getTvTariffs, getTvChannelsWordForms, getOptions],
    (items, wordForm, options) => Utils.sort(
        items
          .filter(x => x.type === ServiceTypes.TvTariff &&
            !x.connected)
          .map((x) => {
            const channels = x.value != null ?
              Utils.getPluralFormFormatted(
                wordForm,
                x.value) :
             '';

            return {
              id: x.id,
              title: x.title,
              channels,
              feeText: `${Utils.formatNum(
                x.fee,
                NumFormats.FixedHideZero)} ${options.rubSymbol}/${options.monthText}`,
              fee: x.fee
            };
          }),
          SortDirection.Ascending,
          'id',
          DataTypes.String)
);

export const getConnectedTvTariffs = createSelector(
    [getTvTariffs],
    items => items.filter(x => x.connected &&
        x.inFttbPreset)
);
