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

import {
  getAvailableMappings,
  isServiceMapped
} from 'selectors/mappings';


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

export const getNote = createSelector(
  [getOptions],
  options => options.wifiRouterPopupNote
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
    [OwnershipType.Gift]: options.wifiGiftStatusText,
    [OwnershipType.ByInstallments]: options.wifiInstallmentStatusText
  }));

export const getMappedOwnerShipTypeTitles = createSelector(
  [getOptions],
  options => ({
    [OwnershipType.Rented]: options.wifiRentedStatusMappedText,
    [OwnershipType.Buyed]: options.wifiBuyStatusText,
    [OwnershipType.Gift]: options.wifiGiftStatusMappedText,
    [OwnershipType.BuyOut]: options.wifiBuyOutStatusText,
    [OwnershipType.ByInstallments]: options.wifiInstallmentStatusMappedText
  }));

const dayAccumulatorPeriodType = [
  AccumulatorPeriodType.AllDays,
  AccumulatorPeriodType.ActiveDays
];

export const getFeeNote = (router, ownerShipTypeTitles, mappedOwnerShipTypeTitles, isMapped) => {
  let installmentTime = router.accumulatorPeriodType === AccumulatorPeriodType.None ?
    '' :
    router.installmentTime;

  if (dayAccumulatorPeriodType.includes(router.accumulatorPeriodType)) {
    installmentTime = ((router.installmentTime || 0) / 30).toFixed();
  }

  const titles = isMapped ? mappedOwnerShipTypeTitles : ownerShipTypeTitles;

  return router.ownershipType === OwnershipType.ByInstallments ?
    titles[router.ownershipType]
      .replace(
        '{0}',
        installmentTime) :
        titles[router.ownershipType];
};

export const getRouters = createSelector(
  [getPreset],
  preset => (preset
    .services || [])
    .filter(x => x.type === ServiceTypes.WifiRent) || []);

export const getItemsSelector = createSelector(
  [getRouters, getOptions, getPreset,
    getChanges, getOwnerShipTypeTitles, getMappedOwnerShipTypeTitles, getAvailableMappings],
  (routers, options, preset, changes, ownerShipTypeTitles, mappedOwnerShipTypeTitles, mappings) => {
    const added = (changes[preset.id] || {}).added || [];
    // const removed = (changes[preset.id] || {}).removed || [];

    return routers.map((x) => {
      const isMapped = isServiceMapped({ mappings, preset, service: x });
      return {
        id: x.id,
        name: x.name,
        isRequired: x.isRequired,
        isMapped,
        connected: /* x.isConnected || */
          isMapped ||
          /* (x.isPreInclude && !removed.find(w => w.id === x.id)) ||
          (x.isAllow && */ !!added.find(w => w.id === x.id) /* ) */ ||
          false,
        serial: isMapped &&
          x.connected ? `${options.wifiSerialText} ${x.serial}` : '',
        charge: x.chargeInfo && x.chargeInfo.chargePrice ?
          `${x.chargeInfo.chargeName || options.wifiChargeText} ${x.chargeInfo.chargePrice} ${options.rubSymbol}` :
          '',
        disabled: isMapped,
        fee: `${((x.accumulatorPrice || x.fee) || 0) - (x.discount || 0)} ${options.rubPerMonth}`,
        feeNote: getFeeNote(x, ownerShipTypeTitles, mappedOwnerShipTypeTitles, isMapped)
      };
    });
  }
);
