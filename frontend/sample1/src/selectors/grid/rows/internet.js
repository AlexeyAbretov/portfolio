/* eslint no-nested-ternary: 0 */

import { createSelector } from 'reselect';

import {
  ServiceTypes,
  GridRowStatus
} from 'consts';

import {
  priceSort,
  KbitsToMbits
} from 'logic';

const map = ({ row, service, options } = {}) => {
  if (!service) {
    return null;
  }

  return {
    ...row,
    value: row.status === GridRowStatus.Allow ?
      options.connectInternetText :
      (service.speed ?
        `${KbitsToMbits(service.speed)} ${options.mbitsPerSecond}` :
        service.value)
  };
};

const selector = ({ preset } = {}) => createSelector(
  [],
  () => {
    const services = (preset.services || [])
      .sort(priceSort);

    let inet = services
      .find(x => x.type === ServiceTypes.Internet &&
        x.isConnected && !x.isLineHolder);

    if (inet) {
      return inet;
    }

    inet = services
      .find(w => w.type === ServiceTypes.Internet &&
        (w.isRequired || w.isPreInclude) &&
        !w.isLineHolder);

    if (inet) {
      return inet;
    }

    if (!preset.isConnected) {
      inet = services
        .find(w => w.type === ServiceTypes.Internet &&
          w.isAllow);

      if (inet) {
        return inet;
      }
    }

    return null;
  }
);

export default {
  selector,
  map
};
