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

    const service = services
      .find(w => w.type === type);

    return service;
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
