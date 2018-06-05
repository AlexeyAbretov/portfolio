import { createSelector } from 'reselect';

import {
  getOpenedPopups,
  getOptions,
  getPresets,
  getServices,
  getChanges
} from 'selectors';

import {
  PopupNames, ServiceTypes
} from 'consts';

const getPopupData = createSelector(
  [getOpenedPopups],
  (opened) => {
    const popup = opened
      .find(x => x.name === PopupNames.TvConsole);

    return (popup || {}).data || {};
  });

export const getPreset = createSelector(
  [getPopupData, getPresets],
  (data, presets) => {
    const { presetId } = data;

    return presets
      .find(x => x.id === presetId) || {};
  });

const getService = createSelector(
  [getPopupData, getPreset],
  (data, preset) => {
    const { serviceId } = data;

    return (preset
      .services || [])
      .find(x => x.id === serviceId) || {};
  });

export const getTv = createSelector(
  [getPreset, getChanges],
  (preset, changes) => {
    const added = (changes[preset.id] || {}).added || [];
    const removed = (changes[preset.id] || {}).removed || [];

    return (preset
      .services || [])
      .find(x => x.type === ServiceTypes.TvTariff && (
        x.isRequired ||
        (x.isPreInclude && !removed.find(y => y.id === x.id)) ||
        (x.isAllow && added.find(y => y.id === x.id))
      ));
  });

export const getConsoles = createSelector(
  [getPreset, getTv],
  (preset, tv) => {
    if (tv) {
      return (preset
        .services || [])
        .filter(x => x.type === ServiceTypes.TvConsole &&
          !x.isTve) || [];
    }

    return (preset
      .services || [])
      .filter(x => x.type === ServiceTypes.TvConsole) || [];
  });

export const openStateSelector = createSelector(
  [getOpenedPopups],
  opened => !!opened.find(x => x.name === PopupNames.TvConsole)
);

export const getTitleSelector = createSelector(
  [getService, getOptions],
  (service, options) => {
    if (options.tvConsoleTitle) {
      return options.tvConsoleTitle;
    }

    return service.name;
  }
);

export const getDescriptionSelector = createSelector(
  [getService],
  service => service.shortDescription
);

export const getItemsSelector = createSelector(
  [getConsoles, getOptions, getTv, getPreset, getChanges],
  (consoles, options, tv, preset, changes) => {
    const added = (changes[preset.id] || {}).added || [];
    const removed = (changes[preset.id] || {}).removed || [];

    return consoles.map((x, index, arr) => ({
      id: x.id,
      name: options.tvConsoleTitle || x.name,
      connected: x.connected ||
        x.isRequired ||
        (x.isPreInclude && !removed.find(w => w.id === x.id)) ||
        (x.isAllow && added.find(w => w.id === x.id)) ||
        (tv && x.isAllow && !arr
          .filter(w => w.isRequired || x.isPreInclude).length),
      future: x.isPreInclude,
      disabled: x.isRequired,
      fee: `${(x.fee || 0) - (x.discount || 0)} ${options.rubPerMonth}`
    }));
  }
);

export const getNoteSelector = createSelector(
  [getOptions],
  options => options.tvConsoleNote
);

export const getNoteTitleSelector = createSelector(
  [getOptions],
  options => options.tvConsoleNoteTitle
);

export const getShippingTextSelector = createSelector(
  [getOptions, getServices],
  (options, services) => {
    const service = services.find(x => x.type === ServiceTypes.Courier);

    if (!service) {
      return '';
    }

    const result = (options.courierServiceText || '')
      .replace('{0}', `${service.fee} ${options.rubSymbol}`);

    return result;
  }
);
