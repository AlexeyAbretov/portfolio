import { createSelector } from 'reselect';

import {
  ServiceTypes
} from 'consts';

import {
  priceSort
} from 'logic';

const map = ({ row, service, options } = {}) => {
  if (!row) {
    return row;
  }

  return {
    ...row,
    value: service ?
      (options.phoneTitle || service.name) :
      ''
  };
};

const selector = ({ preset } = {}) => createSelector(
  [],
  () => {
    const services = (preset.services || [])
      .sort(priceSort);

    let phone = services
      .find(x => x.type === ServiceTypes.Phone &&
        x.isConnected);

    if (phone) {
      return phone;
    }

    phone = services
      .find(x => x.type === ServiceTypes.Phone &&
        (x.isRequired || x.isPreInclude));

    if (phone) {
      return phone;
    }

    if (!preset.isConnected) {
      phone = services
        .find(x => x.type === ServiceTypes.Phone &&
          x.isAllow);

      if (phone) {
        return phone;
      }
    }

    return null;
  }
);

export default {
  selector,
  map
};
