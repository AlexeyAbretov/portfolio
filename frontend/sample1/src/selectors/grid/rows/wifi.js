import { createSelector } from 'reselect';

import {
  ServiceTypes
} from 'consts';

import {
  priceSort
} from 'logic';

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
  map: ({ row } = {}) => row
};
