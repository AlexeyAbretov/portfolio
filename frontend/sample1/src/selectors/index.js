import { createSelector } from 'reselect';

import {
  SortOrder,
  Groups,
  ServiceTypes
} from 'consts';

export const getOptions = state => (state || {}).options || {};
export const getPresets = state => (state || {}).presets || [];
export const getServices = state => ((state || {}).services || []).items || [];
export const getState = state => state || {};

export const getPopups = createSelector(
  [getState],
  state => state.popups || {});

export const getOpenedPopups = createSelector(
    [getPopups],
    popups => popups.opened || []);

export const getChanges = createSelector(
  [getState],
  state => state.changes || {});

export const getCurrentPreset = createSelector(
  [getPresets],
  presets => presets
    .find(x => x.isConnected) || {});

export const getConnectedServices = createSelector(
  [getServices],
  services => services
    .filter(x => x.isConnected));

export const getPresetServices = createSelector(
  [getPresets],
  (presets) => {
    let result = [];
    presets.forEach((element) => {
      result = result.concat(
        (element.services || []).filter(x => ![
          ServiceTypes.Multiroom,
          ServiceTypes.MobileTv,
          ServiceTypes.AutoPromisePayment
        ].includes(x.type)));
    });

    return result;
  });

export const getChannelsWordForm = createSelector(
  [getOptions],
  options => options.tvChannelsWordForms || {
    rusFirstPlural: '{0}',
    rusSecondPlural: '{0}',
    rusThirdPlural: '{0}'
  });

export const sortPresets = createSelector(
  [getPresets, getOptions],
  (presets, options) => presets
    .sort((a, b) => {
      let result = !options.sortOrder || options.sortOrder === SortOrder.Desc ?
        (b.fee || 0) - (a.fee || 0) :
        (a.fee || 0) - (b.fee || 0);

      if (result === 0) {
        result = a.name > b.name ? 1 : -1;
      }

      return result;
    }));

export const getPresetsViaTveStatus = createSelector(
  [sortPresets, getCurrentPreset],
  (presets, currentPreset) => {
    if (!currentPreset || !currentPreset.isConnected) {
      return presets;
    }

    const console = (currentPreset.services || [])
      .find(x => x.type === ServiceTypes.TvConsole &&
        x.isConnected);

    if (!console) {
      return presets;
    }

    return presets.filter(x => (x.id !== currentPreset.id &&
      (x.services || [])
        .find(w => w.type === ServiceTypes.TvConsole &&
          (w.isTve || false) === (console.isTve || false))) ||
      x.id === currentPreset.id);
  }
);

export const getGroups = createSelector(
  [getOptions],
  (options) => {
    if (!options.groups) {
      return [{
        title: 'Интернет + ТВ',
        image: '',
        code: Groups.InetTv
      }, {
        title: 'Интернет',
        image: '',
        code: Groups.Inet
      }, {
        title: 'ТВ',
        image: '',
        code: Groups.Tv
      }];
    }

    return options.groups;
  });

export const getGroupsOrder = createSelector(
  [getOptions],
  options => options.groupsOrder || []);

export const getPresetItemsOrder = createSelector(
  [getOptions, getPresetServices],
  (options, services) => {
    const order = options.presetItemsOrder &&
      options.presetItemsOrder.length ?
    [
      ...options.presetItemsOrder
    ] :
    [
      ServiceTypes.Internet,
      ServiceTypes.Vsu,
      ServiceTypes.TvTariff,
      ServiceTypes.WifiRent,
      ServiceTypes.TvConsole,
      ServiceTypes.Eset,
      ServiceTypes.StaticIp,
      ServiceTypes.Firewall
    ];

    services.forEach((x) => {
      if (!order.find(o => o === x.type)) {
        order.push(x.type);
      }
    });

    return order.map(x => ({ key: x }));
  });

export const getButtonTitle = createSelector(
  [getOptions],
  options => options.saveChangesText
);
