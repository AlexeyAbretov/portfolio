import { createSelector } from 'reselect';

import {
  GridRowType
} from 'consts';

import {
  priceSort
} from 'logic';

const selector = ({ preset, type } = {}) => createSelector(
  [],
  () => {
    const services = (preset.services || [])
      .sort(priceSort);

    let service = services
      .find(x => x.type === type &&
        x.isConnected);

    if (service) {
      return service;
    }

    service = services
      .find(x => x.type === type &&
        (x.isRequired || x.isPreInclude));

    if (service) {
      return service;
    }

    service = services
      .find(x => x.type === type &&
        x.isAllow);

    if (service) {
      return service;
    }

    return null;
  }
);

export default {
  selector,
  map: ({ row, service } = {}) => ({
    ...row,
    type: GridRowType.Inline,
    value: service.name
  })
};
