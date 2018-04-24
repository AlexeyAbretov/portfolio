import { createSelector } from 'reselect';

import {
  ServiceTypes,
  GridRowStatus
} from 'consts';

import {
  getState
} from 'selectors';

import {
  priceSort
} from 'logic';

import internet from './internet';

const map = ({
  row, service, options } = {}) => {
  if (!row) {
    return null;
  }

  return {
    ...row,
    value: row.status !== GridRowStatus.Allow ?
      `${(options.connectedVsuText || '+ {0}')
        .replace('{0}', (service.speedUp || 0))} ${options.mbitsPerSecond}` :
      options.connectVsuText
  };
};

const selector = ({ preset } = {}) => createSelector(
  [getState],
  (state) => {
    const services = (preset.services || [])
      .sort(priceSort);

    let service = services
      .find(x => x.type === ServiceTypes.Vsu &&
        x.isConnected);

    if (service) {
      return service;
    }

    service = services
      .find(x => x.type === ServiceTypes.Vsu &&
        (x.isRequired || x.isPreInclude));

    if (service) {
      return service;
    }

    const allowVsus = services
      .filter(x => x.type === ServiceTypes.Vsu &&
        x.isAllow);

    if (allowVsus && allowVsus.length) {
      const internetService = internet.selector({
        preset
      })(state);

      if (internetService) {
        const speed = internetService.speed || 0;
        service = allowVsus
          .find(x => (speed + (x.speedUp || 0)) <= (x.maxSpeed || 0));

        if (service) {
          return service;
        }
      }
    }

    return null;
  }
);

export default {
  selector,
  map
};
