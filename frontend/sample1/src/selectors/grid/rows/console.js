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
      (options.tvConsoleTitle || service.name) :
      ''
  };
};

const selector = ({ preset } = {}) => createSelector(
  [],
  () => {
    const services = (preset.services || [])
      .sort(priceSort);

    let console = services
      .find(x => x.type === ServiceTypes.TvConsole &&
        x.isConnected);

    if (console) {
      return console;
    }

    console = services
      .find(x => x.type === ServiceTypes.TvConsole &&
        (x.isRequired || x.isPreInclude));

    if (console) {
      return console;
    }

    if (!preset.isConnected) {
      console = services
        .find(x => x.type === ServiceTypes.TvConsole &&
          x.isAllow);

      if (console) {
        return console;
      }
    }

    return null;
  }
);

export default {
  selector,
  map
};
