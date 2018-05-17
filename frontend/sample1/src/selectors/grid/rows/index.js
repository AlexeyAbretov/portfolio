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
  GridRowType
} from 'consts';

import applyDecorators from './decorators';

import internet from './internet';
import tv from './tv';
import wifi from './wifi';
import antivir from './antivir';
import console from './console';
import vsu from './vsu';
import phone from './phone';

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
  [ServiceTypes.Vsu]: vsu,
  [ServiceTypes.Phone]: phone
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
  image: service.hasGift ?
    options.giftIcon :
    ''
});

export default ({ preset } = {}) => {
  const selector = createSelector(
    [getPresetItemsOrder, getState, getChanges, getOptions],
    (order, state, changes, options) => {
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

          row = applyDecorators({
            state,
            row,
            preset,
            service
          });

          if (!row) {
            return;
          }

          if ((mapper || common).map) {
            row = (mapper || common).map({
              row,
              service,
              options,
              changes,
              preset
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
