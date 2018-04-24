import { createSelector } from 'reselect';

import {
  ServiceTypes,
  Groups
} from 'consts';

import {
  getOptions,
  getGroups,
  getGroupsOrder
} from 'selectors';

import
  mapPresets
from './map';

export const groupsSelector = createSelector(
  [getGroups, getGroupsOrder, getOptions],
  (groups, groupsOrder) => {
    if (groupsOrder.length && groupsOrder.length === 3) {
      const order = groupsOrder.map((x) => {
        const items = groups.filter(z => z.code === x);
        if (items.length) {
          return items[0];
        }

        return {
          title: null,
          image: null,
          code: null
        };
      });

      if (!order.find(x => !x.title)) {
        return order;
      }
    }

    return groups;
  }
);

const getTvPresets = createSelector(
  [mapPresets],
  items => [
    ...items
      .filter(x => (x.services || [])
        .filter(w => w.type === ServiceTypes.Internet &&
          (w.isRequired || w.isPreInclude) &&
          w.isLineHolder)
        .length > 0)
  ]);

const getInetTvPresets = createSelector(
  [mapPresets, getTvPresets],
  (items, tvItems) => [
    ...items
      .filter(x => !tvItems.find(w => w.id === x.id))
      .filter(x => (x.services || [])
        .filter(w => w.type === ServiceTypes.Internet &&
          (w.isRequired || w.isPreInclude) &&
          !w.isLineHolder)
        .length > 0 &&
        (x.services || [])
          .filter(w => (w.type === ServiceTypes.TvTariff ||
            w.type === ServiceTypes.Tve) &&
            (w.isRequired || w.isPreInclude))
          .length > 0)
  ]);

const getInetPresets = createSelector(
  [mapPresets, getTvPresets],
  (items, tvItems) => [
    ...items
      .filter(x => !tvItems.find(w => w.id === x.id))
      .filter(x => (x.services || [])
        .filter(w => w.type === ServiceTypes.Internet &&
          (w.isRequired || w.isPreInclude) &&
          !w.isLineHolder)
        .length > 0 &&
        (x.services || [])
          .filter(w => (w.type === ServiceTypes.TvTariff ||
            w.type === ServiceTypes.Tve) &&
            (w.isRequired || w.isPreInclude))
          .length === 0)
  ]);


export const itemsSelector = createSelector(
  [getInetTvPresets, getInetPresets, getTvPresets],
  (inetTvPresets, inetPresets, tvPresets) => {
    const result = {};

    if (inetTvPresets && inetTvPresets.length) {
      result[Groups.InetTv] = inetTvPresets;
    }

    if (inetPresets && inetPresets.length) {
      result[Groups.Inet] = inetPresets;
    }

    if (tvPresets && tvPresets.length) {
      result[Groups.Tv] = tvPresets;
    }

    return result;
  });
