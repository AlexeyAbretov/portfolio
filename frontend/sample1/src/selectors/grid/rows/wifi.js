import { createSelector } from 'reselect';

import {
  ServiceTypes
} from 'consts';

import {
  priceSort
} from 'logic';

const map = ({ row, service, options } = {}) => {
  if (!service || !row) {
    return row;
  }

  return {
    ...row,
    value: !service.isConnected && options.wifiRentTitle ?
      options.wifiRentTitle :
      service.name
  };
};

const selector = ({ preset } = {}) => createSelector(
  [],
  () => {
    const services = (preset.services || [])
      .sort(priceSort);

    let service = services
      .find(x => x.type === ServiceTypes.WifiRent &&
        x.isConnected);

    if (service) {
      return service;
    }

    service = services
      .find(x => x.type === ServiceTypes.WifiRent &&
        (x.isRequired || x.isPreInclude));

    if (service) {
      return service;
    }

    service = services
      .find(x => x.type === ServiceTypes.WifiRent &&
        x.isAllow);

    if (service) {
      return service;
    }

    return null;
  }
);

export default {
  selector,
  map
};
