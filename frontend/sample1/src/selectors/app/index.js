import { createSelector } from 'reselect';

import {
    ServiceTypes
} from 'consts';

import {
    getOptions,
    getCurrentPreset,
    getConnectedServices
} from 'selectors';

export const getNote = createSelector(
    [getCurrentPreset, getConnectedServices, getOptions],
    (currentPreset, services, options) => {
      if (currentPreset.isConnected) {
        return null;
      }

      const bundle = services
        .find(x => x.type === ServiceTypes.Kit);

      if (bundle) {
        return (options.bundleNote || '')
            .replace('{0}', bundle.name)
            .replace('{1}', bundle.url);
      }

      const other = services
        .filter(x => x.type === ServiceTypes.Internet ||
            x.type === ServiceTypes.TvTariff ||
            x.type === ServiceTypes.Tve);

      return other.length ?
        (options.note || '') :
        '';
    });

export const getInfoText = createSelector(
    [getOptions],
    options => options.infoText);

export const getTitle = createSelector(
    [getOptions],
    options => options.title);
