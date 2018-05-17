import { createSelector } from 'reselect';

import {
  getPresetItemsOrder,
  getState,
  getChanges,
  getOptions
} from 'selectors';

import {
  ServiceTypes,
  GridRowStatus,
  GridRowType,
  MappingState
} from 'consts';

import {
  getAvailableMappings
} from 'selectors/mappings';

import internet from './internet';
import tv from './tv';
import wifi from './wifi';
import antivir from './antivir';
import console from './console';
import vsu from './vsu';

import common from './common';

const mappers = {
  [ServiceTypes.Internet]: internet,
  [ServiceTypes.TvTariff]: tv,
  [ServiceTypes.Tve]: tv,
  [ServiceTypes.WifiRent]: wifi,
  [ServiceTypes.Eset]: antivir,
  [ServiceTypes.Kasper]: antivir,
  [ServiceTypes.DrWeb]: antivir,
  [ServiceTypes.TvConsole]: console,
  [ServiceTypes.Vsu]: vsu
};

export const getRow = ({
  service = {}, options = {} } = {}
) => ({
  key: service.type,
  type: GridRowType.Link,
  value: service.name,
  id: service.id,
  status: service.isConnected ? /* eslint no-nested-ternary: 0 */
    GridRowStatus.Connected :
    (service.isPreInclude || service.isRequired) ?
      GridRowStatus.Default :
      GridRowStatus.Allow,
  image: service.isConnected && service.hasGift ?
    options.giftIcon :
    ''
});

const changesDecorator = ({ row, preset, changes } = {}) => {
  if (!changes[preset.id] ||
    preset.isConnected) {
    return row;
  }

  const added = (changes[preset.id] || {}).added || [];
  const removed = (changes[preset.id] || {}).removed || [];

  const service = (preset.services || [])
    .find(x => x.id === row.id);

  if (service.isAllow) {
    return {
      ...row,
      status: added
        .find(x => x.id === row.id) ?
        GridRowStatus.Default :
        GridRowStatus.Allow
    };
  } else if (service.isRequired ||
    service.isPreInclude) {
    return {
      ...row,
      status: removed
        .find(x => x.id === row.id) ?
        GridRowStatus.Allow :
        GridRowStatus.Default
    };
  }

  return row;
};

const connectedPresetDecorator = ({ row, preset } = {}) => {
  if (preset.isConnected) {
    if (row.status === GridRowStatus.Allow) {
      return null;
    }

    return {
      ...row,
      type: GridRowType.Inline
    };
  }

  return row;
};

const mappingsDecorator = ({ row, preset, service, mappings } = {}) => {
  if (preset.isConnected || !row) {
    return row;
  }

  const serviceState = (mappings[preset.id] || {})[service.id];

  if (!serviceState) {
    return row;
  }

  if ((serviceState === MappingState.Change ||
    serviceState === MappingState.Select) &&
    (service.isPreInclude || service.isRequired)) {
    return row;
  }

  if ((serviceState === MappingState.Change ||
    serviceState === MappingState.Select) &&
    service.isAllow) {
    return {
      ...row,
      status: GridRowStatus.Connected
    };
  }

  if (serviceState === MappingState.Delete) {
    const anotherServices = (preset.services || [])
      .filter(x => x.type === service.type &&
        x.id !== service.id);

    const withDeleteStatus = anotherServices
      .filter(x => (mappings[preset.id] || {})[x.id] === MappingState.Delete);

    if (anotherServices.length &&
      anotherServices.length !== withDeleteStatus.length) {
      return {
        ...row,
        status: GridRowStatus.Allow
      };
    }

    return null;
  }

  return row;
};

export default ({ preset } = {}) => {
  const selector = createSelector(
    [getPresetItemsOrder, getState, getChanges, getChanges, getOptions, getAvailableMappings],
    (order, state, serviceChanges, changes, options, mappings) => {
      let rows = [];
      order.forEach((x) => {
        const mapper = mappers[x.key];
        const service = mapper ?
          mapper.selector({
            preset,
            rows
          })(state) :
          common.selector({
            preset,
            type: x.key
          })(state);

        if (service) {
          let row = getRow({
            service, options
          });

          row = changesDecorator({
            row, preset, changes: serviceChanges
          });

          row = connectedPresetDecorator({
            row, preset
          });

          row = mappingsDecorator({
            row, preset, service, mappings
          });

          if (!row) {
            return;
          }

          if ((mapper || common).map) {
            row = (mapper || common).map({
              row,
              service,
              options,
              changes
            });
          }

          if (row && row.value) {
            rows = [
              ...rows,
              row
            ];
          }
        }
      });

      return rows;
    }
  );

  return selector;
};
