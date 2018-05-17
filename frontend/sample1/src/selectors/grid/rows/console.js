import { createSelector } from 'reselect';

import {
  ServiceTypes
} from 'consts';

import {
  priceSort
} from 'logic';

import {
  getPluralFormFormatted
} from 'utils';

const map = ({ row, service, options, preset } = {}) => {
  if (!row) {
    return row;
  }

  if (!service.isConnected) {
    return {
      ...row,
      value: service ?
        (options.tvConsoleTitle || service.name) :
        ''
    };
  }

  const counts = ((preset || {}).services || [])
    .filter(x => x.type === ServiceTypes.TvConsole &&
      x.isConnected)
    .length;

  return {
    ...row,
    value: options.tvConsoleWordForms ?
      getPluralFormFormatted(options.tvConsoleWordForms, counts) :
      `${counts} ${service.name}`
  };
};

const selector = ({ preset, rows } = {}) => createSelector(
  [],
  () => {
    if ((rows || []).find(x => x.key === ServiceTypes.TvConsole)) {
      return null;
    }

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
