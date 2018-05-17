import { createSelector } from 'reselect';

import {
  ServiceTypes
} from 'consts';

import {
  priceSort
} from 'logic';

const types = [
  ServiceTypes.Eset,
  ServiceTypes.Kasper,
  ServiceTypes.DrWeb
];

const selector = ({ preset, rows } = {}) => createSelector(
  [],
  () => {
    const services = (preset.services || [])
      .sort(priceSort);

    if ((rows || []).find(x => types.find(w => w === x.key))) {
      return null;
    }

    let kav = services
      .find(x => types.find(w => w === x.type) &&
        x.isConnected);

    if (kav) {
      return kav;
    }

    kav = services
      .find(x => types.find(w => w === x.type) &&
        (x.isRequired || x.isPreInclude));

    if (kav) {
      return kav;
    }

    if (!preset.isConnected) {
      kav = services
        .find(x => types.find(w => w === x.type) &&
          x.isAllow);

      if (kav) {
        return kav;
      }
    }

    return null;
  }
);

export default {
  selector,
  map: ({ row } = {}) => row
};
