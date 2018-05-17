/* eslint no-nested-ternary: 0 */

import { createSelector } from 'reselect';

import {
  ServiceTypes,
  GridRowStatus,
  TvPacketSaveStatus
} from 'consts';

import {
  getPluralFormFormatted
} from 'utils';

import {
  priceSort
} from 'logic';

const map = ({
  row, service, options, changes } = {}) => {
  if (!row) {
    return null;
  }

  const baseChannels = service.channels || 0;
  const packetsChanges = changes[service.id] || {};
  const removed = packetsChanges.removed || [];
  const added = packetsChanges.added || [];
  let packets = [];

  if (row.status === GridRowStatus.Connected) {
    packets = (service.packets || [])
      .filter(x => x.isConnected &&
        !removed.find(r => r.id === x.id));
  } else {
    packets = (service.packets || [])
      .filter(x => x.isObligatory ||
        x.saveStatus !== TvPacketSaveStatus.Unknow ||
        (x.isPreSelected && !removed.find(r => r.id === x.id)));
  }

  let channels = packets.reduce(
    ((res, b) => res + (b.channels || 0)),
    baseChannels);

  channels = added.reduce(
    ((res, b) => res + (b.channels || 0)),
    channels);

  return {
    ...row,
    value: row.status === GridRowStatus.Allow ?
      options.connectTvText :
      channels ?
        getPluralFormFormatted(
          options.tvChannelsWordForms,
          channels
        ) :
        ''
  };
};

const types = [
  ServiceTypes.Tve,
  ServiceTypes.TvTariff
];

const selector = ({ preset = {}, rows = [] } = {}) => createSelector(
  [],
  () => {
    if ((rows || []).find(x => types.find(w => w === x.key))) {
      return null;
    }

    const services = (preset.services || [])
      .sort(priceSort);
    let tv = services
      .find(x => types.find(w => w === x.type) &&
        x.isConnected);

    if (tv) {
      return tv;
    }

    tv = services
      .find(x => types.find(w => w === x.type) &&
        (x.isRequired || x.isPreInclude));

    if (tv) {
      return tv;
    }

    if (!preset.isConnected) {
      tv = services
        .find(x => types.find(w => w === x.type) &&
          x.isAllow);

      if (tv) {
        return tv;
      }
    }

    return null;
  }
);

export default {
  selector,
  map
};
