import { createSelector } from 'reselect';

import {
  getOpenedPopups,
  getPresets,
  getOptions,
  getChanges
} from 'selectors';

import {
  getAvailableMappings,
  getServiceMappingState,
  SavedMappingStates
} from 'selectors/mappings';

import {
  PopupNames,
  ServiceTypes,
  InetServiceTypes
} from 'consts';

export const openStateSelector = createSelector(
  [getOpenedPopups],
  opened => !!opened.find(x => x.name === PopupNames.Inet)
);

const getPopupData = createSelector(
  [getOpenedPopups],
  (opened) => {
    const popup = opened
      .find(x => x.name === PopupNames.Inet);

    return (popup || {}).data || {};
  });

export const getPreset = createSelector(
  [getPopupData, getPresets],
  (data, presets) => {
    const { presetId } = data;

    return presets
      .find(x => x.id === presetId) || {};
  });

export const getTitleSelector = createSelector(
  [getOptions],
  options => options.inetPopupTitle
);

export const getAddTitleSelector = createSelector(
  [getOptions],
  service => service.inetPopupAddButtonTitle
);

export const getContinueTitleSelector = createSelector(
  [getOptions],
  options => options.inetPopupNextButtonTitle
);

export const getCancelTitleSelector = createSelector(
  [getOptions],
  options => options.inetPopupCancelButtonTitle
);

export const getSpeedChangeText = createSelector(
  [getOptions],
  options => options.changeSpeedText
);

export const getSpeedSelectText = createSelector(
  [getOptions],
  options => options.selectSpeedText
);

export const getInetItems = createSelector(
  [getPreset],
  preset => (preset
    .services || [])
    .filter(x => x.type === ServiceTypes.Internet) || []);

export const getSpeedText = (inet, options) =>
  `${inet.speed} ${options.mbitsPerSecond}`;

const types = [
  InetServiceTypes.N,
  InetServiceTypes.MultiService
];

export const getNightSpeedText = (inet, options) => {
  if (!types.includes(inet.internetType)) {
    return '';
  }

  if (!inet.nightSpeed) {
    return '';
  }

  if (inet.nightSpeed === inet.speed) {
    return '';
  }

  return `${inet.nightSpeed} ${options.mbitsPerSecond}`;
};

export const getSpeedTitle = (inet, options) =>
  (getNightSpeedText(inet, options) ? options.internetDaySpeedTitle : '');

export const getNightSpeedTitle = (inet, options) =>
  (getNightSpeedText(inet, options) ? options.internetNightSpeedTitle : '');

export const getVsu = (inet, preset, options, mappings) => {
  if (!inet.isVsuAllow) {
    return [];
  }

  const maxSpeed = ((preset.services || [])
    .find(x => x.type === ServiceTypes.Vsu) || {}).maxSpeed || 0;

  const allowVsus = (preset.services || [])
    .filter(x => x.type === ServiceTypes.Vsu &&
      !x.isConnected)
    .filter(x => ((inet.speed || 0) + (x.speedUp || 0)) <= maxSpeed &&
      ((inet.speed || 0) + (x.speedUp || 0)) !== inet.speed)
    .sort((a, b) => (a.speedUp || 0) - (b.speedUp || 0))
    .map((x, index) => ({
      id: x.id,
      name: `${(inet.speed || 0) + (x.speedUp || 0)} ${options.mbitsPerSecond}`,
      feeText: `+ ${(x.fee || 0) - (x.discount || 0)} ${options.rubPerMonth}`,
      fee: x.fee,
      vsuConnectFee: x.vsuConnectFee,
      vsuMoveDownFee: x.vsuMoveDownFee,
      vsuMoveUpFee: x.vsuMoveUpFee,
      mappingState: getServiceMappingState(
        { mappings, preset, service: x }),
      connected: (SavedMappingStates.includes(
        getServiceMappingState({ mappings, preset, service: x }))) ||
        index === 0 ||
        false
    }));

  return allowVsus;
};

export const getItemsSelector = createSelector(
  [getInetItems, getOptions, getChanges, getPreset, getAvailableMappings],
  (items, options, changes, preset, mappings) => {
    const added = (changes[preset.id] || {}).added || [];
    const removed = (changes[preset.id] || {}).removed || [];

    return items
    .filter(x => !x.isLineHolder && !x.isConnected)
    .map(x => ({
      id: x.id,
      name: x.name,
      speed: getSpeedText(x, options),
      speedTitle: getSpeedTitle(x, options),
      nightSpeed: getNightSpeedText(x, options),
      nightSpeedTitle: getNightSpeedTitle(x, options),
      connected: x.isConnected ||
        x.isRequired ||
        (x.isPreInclude && !removed.find(w => w.id === x.id)) ||
        (x.isAllow && !!added.find(w => w.id === x.id)) ||
        (SavedMappingStates.includes(
          getServiceMappingState({ mappings, preset, service: x })) &&
          !removed.length && !added.length) ||
        false,
      // возможно не нужно делать внутри тарифа
      // список для всех одинаковый
      vsu: getVsu(x, preset, options, mappings),
      disabled: x.isRequired,
      fee: `${((x.accumulator ? x.accumulatorPrice : x.fee) || 0) - (x.discount || 0)} ${options.rubPerMonth}`
    }));
  }
);

export const getConnectedVsu = createSelector(
  [getPreset],
  preset => (preset.services || [])
    .find(x => x.type === ServiceTypes.Vsu &&
      x.isConnected)
);

export const getSupportService = createSelector(
  [getInetItems, getOptions, getAvailableMappings, getPreset],
  (items, options, mappings, preset) => items
    .filter(x => x.isLineHolder &&
      SavedMappingStates.includes(
        getServiceMappingState({ mappings, preset, service: x })))
    .map(x => ({
      id: x.id,
      name: `${options.servicePrefixText} ${x.name}`,
      connected: false,
      disabled: true,
      description: x.shortDescription,
      fee: `${((x.accumulator ? x.accumulatorPrice : x.fee) || 0) - (x.discount || 0)} ${options.rubPerMonth}`
    }))[0]
);

export const getOncePriceChangeSpeedText = createSelector(
  [getOptions],
  options => options.oncePriceSpeedText
);
