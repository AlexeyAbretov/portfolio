import { createSelector } from 'reselect';

import {
  getOpenedPopups,
  getPresets,
  getOptions,
  getChanges
} from 'selectors';

import {
  PopupNames,
  ServiceTypes,
  OwnershipType,
  AccumulatorPeriodType
} from 'consts';

export const openStateSelector = createSelector(
  [getOpenedPopups],
  opened => !!opened.find(x => x.name === PopupNames.WifiRouter)
);

export const getTitleSelector = createSelector(
  [getOptions],
  options => options.wifiRouterPopupTitle
);

export const getDescriptionSelector = createSelector(
  [getOptions],
  options => options.wifiRouterPopupDesc
);

export const getCancelTitleSelector = createSelector(
  [getOptions],
  options => options.wifiRouterPopupCancelButtonTitle
);

export const getAddTitleSelector = createSelector(
  [getOptions],
  service => service.wifiRouterPopupAddButtonTitle
);

export const getContinueTitleSelector = createSelector(
  [getOptions],
  options => options.wifiRouterPopupNextButtonTitle
);

const getPopupData = createSelector(
  [getOpenedPopups],
  (opened) => {
    const popup = opened
      .find(x => x.name === PopupNames.WifiRouter);

    return (popup || {}).data || {};
  });

export const getPreset = createSelector(
  [getPopupData, getPresets],
  (data, presets) => {
    const { presetId } = data;

    return presets
      .find(x => x.id === presetId) || {};
  });

export const getOwnerShipTypeTitles = createSelector(
  [getOptions],
  options => ({
    [OwnershipType.Rented]: options.wifiRentedStatusText,
    [OwnershipType.Buyed]: options.wifiBuyStatusText,
    [OwnershipType.Gift]: options.wifiGiftStatusText,
    [OwnershipType.BuyOut]: options.wifiBuyOutStatusText,
    [OwnershipType.ByInstallments]: options.wifiInstallmentStatusText
  }));

const dayAccumulatorPeriodType = [
  AccumulatorPeriodType.AllDays,
  AccumulatorPeriodType.ActiveDays
];

export const getFeeNote = (router, ownerShipTypeTitles) => {
  let installmentTime = router.accumulatorPeriodType === AccumulatorPeriodType.None ?
    '' :
    router.installmentTime;

  if (dayAccumulatorPeriodType.includes(router.accumulatorPeriodType)) {
    installmentTime = router.installmentTime / 30;
  }

  return router.OwnershipType === OwnershipType.ByInstallments ?
    ownerShipTypeTitles[router.OwnershipType]
      .replace(
        '{0}',
        installmentTime) :
    ownerShipTypeTitles[router.OwnershipType];
};

export const getRouters = createSelector(
  [getPreset],
  preset => (preset
    .services || [])
    .filter(x => x.type === ServiceTypes.WifiRent) || []);

export const getItemsSelector = createSelector(
  [getRouters, getOptions, getPreset, getChanges, getOwnerShipTypeTitles],
  (routers, options, preset, changes, ownerShipTypeTitles) => {
    const added = (changes[preset.id] || {}).added || [];
    const removed = (changes[preset.id] || {}).removed || [];

    return routers.map(x => ({
      id: x.id,
      name: x.name,
      connected: x.connected ||
        x.isRequired ||
        (x.isPreInclude && !removed.find(w => w.id === x.id)) ||
        (x.isAllow && added.find(w => w.id === x.id)),
      future: x.isPreInclude,
      disabled: x.isRequired,
      fee: `${(x.fee || 0) - ((x.accumulator ? x.discount : 0) || 0)} ${options.rubPerMonth}`,
      feeNote: getFeeNote(x, ownerShipTypeTitles)
    }));
  }
);
