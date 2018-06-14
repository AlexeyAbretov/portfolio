import { createSelector } from 'reselect';

import {
  getOpenedPopups,
  getPresets,
  getOptions,
  getChanges,
  getEquipmentsWordForm
} from 'selectors';

import {
  getAvailableMappings,
  getServiceMappingState,
  SavedMappingStates
} from 'selectors/mappings';

import {
  PopupNames,
  ServiceTypes
} from 'consts';

import {
  getPluralFormFormatted
} from 'utils';

export const openStateSelector = createSelector(
  [getOpenedPopups],
  opened => !!opened.find(x => x.name === PopupNames.Antivir)
);

const getPopupData = createSelector(
  [getOpenedPopups],
  (opened) => {
    const popup = opened
      .find(x => x.name === PopupNames.Antivir);

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
  options => options.antivirusPopupTitle
);

export const getAddTitleSelector = createSelector(
  [getOptions],
  service => service.antivirusPopupAddButtonTitle
);

export const getContinueTitleSelector = createSelector(
  [getOptions],
  options => options.antivirusPopupNextButtonTitle
);

export const getCancelTitleSelector = createSelector(
  [getOptions],
  options => options.antivirusPopupCancelButtonTitle
);

export const getDetailsTitleSelector = createSelector(
  [getOptions],
  options => options.antivirusDetailsTitle
);

export const getSelectionNote = createSelector(
  [getOptions],
  options => options.antivirusSelectionNote
);

export const getMappedSelectionNote = createSelector(
  [getOptions],
  options => options.antivirusMappedSelectionNote
);

export const getEmailNote = createSelector(
  [getOptions],
  options => options.antivirusEsetPopupNote
);

const types = [
  ServiceTypes.Eset,
  ServiceTypes.Kasper,
  ServiceTypes.DrWeb
];

export const getAntiviruses = createSelector(
  [getPreset],
  preset => (preset
    .services || [])
    .filter(x => types.includes(x.type)) || []);

export const getItemsSelector = createSelector(
  [getAntiviruses, getOptions, getEquipmentsWordForm, getPreset, getChanges, getAvailableMappings],
  (antiviruses, options, equipmentWordForm, preset, changes, mappings) => {
    const added = (changes[preset.id] || {}).added || [];
    const removed = (changes[preset.id] || {}).removed || [];

    return antiviruses.map(x => ({
      id: x.id,
      name: x.name,
      licenses: x.licenseCount ?
        getPluralFormFormatted(
          equipmentWordForm,
          x.licenseCount
        ) :
        '',
      description: x.description,
      type: x.type,
      connected: x.isConnected ||
        x.isRequired ||
        (x.isPreInclude && !removed.find(w => w.id === x.id)) ||
        (x.isAllow && !!added.find(w => w.id === x.id)) ||
        (SavedMappingStates.includes(
          getServiceMappingState({ mappings, preset, service: x })) &&
          !removed.length && !added.length) ||
        false,
      future: x.isPreInclude,
      disabled: x.isRequired,
      fee: `${((x.accumulator ? x.accumulatorPrice : x.fee) || 0) - (x.discount || 0)} ${options.rubPerMonth}`
    }));
  }
);

export const getGroups = createSelector(
  [getOptions],
  options => (options.antivirusGroups && options.antivirusGroups.length ?
    options.antivirusGroups.map((x, i) => ({
      ...x,
      selected: i === 0
    })) :
  [{
    title: 'Kasper',
    code: ServiceTypes.Kasper,
    selected: true
  },
  {
    title: 'Eset',
    code: ServiceTypes.Eset
  },
  {
    title: 'Dr.Web',
    code: ServiceTypes.DrWeb
  }])
);

export const getGroupsOrder = createSelector(
  [getOptions, getAntiviruses],
  (options, antiviruses) => {
    if (!options.antivirusGroupsOrder ||
      !options.antivirusGroupsOrder.length) {
      return antiviruses
        .map(x => x.type)
        .filter((x, index, arr) => arr.indexOf(x) === index);
    }

    return options.antivirusGroupsOrder;
  }
);

export const getMappedItem = createSelector(
  [getAntiviruses, getPreset, getAvailableMappings],
  (antiviruses, preset, mappings) => antiviruses
    .find(x => (SavedMappingStates.includes(
      getServiceMappingState({ mappings, preset, service: x }))) || {}).id
  );

export const getSortedGroups = createSelector(
  [getGroups, getGroupsOrder, getItemsSelector],
  (groups, order, items) => order.map((x, index) => ({
    selected: !!items
      .find(w => w.connected &&
        w.type === x) ||
          (!items
            .find(w => w.connected) &&
          index === 0),
    code: x,
    title: (groups.find(w => w.code === x) || {
      title: `группа ${x}` }).title
  }))
);
