import { createSelector } from 'reselect';

import {
  getOptions,
  getPresetsViaTveStatus,
  getState,
  getChanges
} from 'selectors';

import {
  clone
} from 'utils';

import {
  ServiceTypes,
  AccumulatorDiscountType
} from 'consts';

import prepareRows from './rows';

const getButtonText = ({
  item, options, changes
} = {}) => {
  if (item.isConnected) {
    return options.yourTariffText;
  }

  const added = (changes[item.id] || {}).added || [];

  if (added.find(w => w.type === ServiceTypes.WifiRent ||
    w.type === ServiceTypes.TvConsole)) {
    return options.orderTariffText;
  }

  return options.connectTariffText;
};

const packetPrices = {
  [AccumulatorDiscountType.BySum]: packet =>
    (packet.fee || 0) - (packet.discount || 0),
  [AccumulatorDiscountType.ByPercent]: packet =>
    ((packet.fee || 0) * (100 - (packet.discount || 0))) / 100,
};

const getTvPacketPrice = ({
  packet
}) => {
  if (!packet) {
    return 0;
  }

  if (packetPrices[packet.discountType]) {
    return packetPrices[packet.discountType](packet);
  }

  return packet.fee;
};

const servicePrices = {
  [AccumulatorDiscountType.BySum]: service =>
    (service.fee || 0) - (service.accumulator || 0),
  [AccumulatorDiscountType.ByPercent]: service =>
    (((service.fee || 0) * (service.accumulator || 0)) / 100),
};

const getServicePrice = ({
  service
}) => {
  if (!service) {
    return 0;
  }

  let price = (service.fee || 0) - (service.discount || 0);

  if (packetPrices[service.discountType]) {
    price -= servicePrices[service.discountType](service);
  }

  return price;
};

const getCurrentPrice = ({
  item
} = {}) => {
  if (item.isConnected) {
    return item.connectedFee;
  }

  const services = item.services || [];
  const packets = item.packets || [];

  let sum = services
    .filter(x => !x.isRequired)
    .reduce((acc, b) => acc + getServicePrice({ service: b }),
      item.fee);

  sum = packets
    .reduce((acc, b) => acc + getTvPacketPrice({ packet: b }),
      sum);

  return sum;
};

export default createSelector(
  [getPresetsViaTveStatus, getOptions, getState, getChanges],
  (items, options, state, changes) => {
    const result = items.map((x) => {
      const item = clone(x);

      item.rows = prepareRows({
        preset: x
      })(state);

      item.feeUnit = options.rubSymbol;
      item.feePeriod = options.feePeriod;
      item.additionalServicesText = options.additionalServicesText;
      item.sumUnit = options.rubPerMonth;

      item.sum = getCurrentPrice({
        item
      });

      item.buttonTitle = getButtonText({
        item, options, changes
      });

      item.setupText = item.isConnected ?
        options.setupTariffText :
        '';
      item.moreInfoText = options.moreInfoText;

      return item;
    });

    return result;
  });
