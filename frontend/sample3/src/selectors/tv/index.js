import { createSelector } from 'reselect';

import {
    getTvSubscriptionsWordForms,
    getTvChannelsWordForms,
    getTvEquipmentsValueText,
    getOptions
} from 'selectors';

import {
    getPreset,
    getConnectedMultirooms,
    getConnectedTvConsoles,
    getConnectedTvTariffs,
    getPresetItems
} from 'selectors/presets';

import {
    getTvChangePopup
} from 'selectors/popups';

import
    getChanges
from 'selectors/changes';

import Utils from 'utils';

import {
    NumFormats,
    TvPacketTypes
} from 'consts';

export const getTv = createSelector(
    [getPreset],
    preset => preset.tv || {});

export const getTvFee = createSelector(
    [getTv],
    tv => tv.fee || 0);

export const getPackages = createSelector(
    [getTv],
    tv => tv.packages || []);

export const getSortedPackages = createSelector(
    [getPackages],
    packages => packages
      .sort((a, b) => {
        const aConnected = a.connected ? 1 : 0;
        const bConnected = b.connected ? 1 : 0;

        let result = bConnected - aConnected;

        if (result === 0) {
          result = (a.fee || 0) - (b.fee || 0);
        }

        if (result === 0) {
          return a.title > b.title ? 1 : -1;
        }

        return result;
      }));

export const getGroups = createSelector(
    [getTv],
    tv => tv.groups || []);

export const getSortedGroups = createSelector(
    [getGroups],
    groups => groups.sort((a, b) => {
      const r = (a.order || 0) - (b.order || 0);

      if (r === 0) {
        return a.name > b.name ? 1 : -1;
      }

      return r;
    }));

export const getGroupsWithItems = createSelector(
    [getSortedGroups, getSortedPackages, getOptions],
    (groups, packages, options) => groups.map((x) => {
      const gr = {
        ...x,
        items: [
          ...packages
            .filter(s => s.groupId === x.id)
            .map(m => ({
              id: m.id,
              title: m.title,
              connected: m.connected,
              channels: m.isSubscription ?
                '' :
                Utils.getPluralFormFormatted(
                    options.tvChannelsWordForms,
                    m.channels || 0),
              feeText: `${Utils.formatNum(
                m.fee,
                NumFormats.FixedHideZero)} ${options.rubSymbol}/${options.monthText}`
            }))
        ]
      };

      return gr;
    })
    .filter(x => x.items && x.items.length)
);

export const getGroupsWithItemsState = createSelector(
    [getGroupsWithItems],
    groups => groups.map(x => ({
      ...x,
      items: [
        ...x.items.map(i => ({
          ...i,
          change: i.connected
        }))
      ]
    })));

export const getTvPacketsChanges = createSelector(
    [getChanges, getPreset, getTv],
    (changes, preset, tv) => {
      const key = `${preset.id}_${tv.id}`;
      if (!changes[key]) {
        return {};
      }

      const added = (changes[key].added || [])
        .filter(x => x.type === TvPacketTypes.Concrete);
      const removed = (changes[key].removed || [])
        .filter(x => x.type === TvPacketTypes.Concrete);

      if (added.length || removed.length) {
        return {
          added,
          removed
        };
      }

      return {};
    });

export const getGroupsWithItemsViaChanges = createSelector(
    [getGroupsWithItemsState, getTvPacketsChanges],
    (groups, changes) => {
      const { added = [], removed = [] } = changes || {};

      return groups.map(x => ({
        ...x,
        items: [
          ...x.items.map((i) => {
            let change = i.connected;

            if (removed.find(f => f.id === i.id) ||
                added.find(f => f.id === i.id)) {
              change = !change;
            }

            return {
              ...i,
              change
            };
          })
        ]
      })
    );
    });

export const getCurrentConnectingPackets = createSelector(
      [getPackages, getTvPacketsChanges],
      (packets, changes) => {
        if (!changes) {
          return packets.filter(x => x.connected);
        }

        const { added = [], removed = [] } = changes;

        return packets
          .map((i) => {
            let connected = i.connected;

            if (removed.find(f => f.id === i.id) ||
              added.find(f => f.id === i.id)) {
              connected = !connected;
            }

            return {
              ...i,
              connected
            };
          })
          .filter(x => x.connected);
      });

export const getChannelsCount = createSelector(
    [getTv],
    tv => tv.channelsCount || 0);

export const getSubscriptions = createSelector(
    [getPackages],
    packages => packages.filter(x => x.isSubscription));

export const getConcretePackets = createSelector(
    [getPackages],
    packages => packages.filter(x => !x.isSubscription));

export const getSubscriptionsCountString = createSelector(
    [getSubscriptions, getTvSubscriptionsWordForms],
    (subscriptions, wordForm) => (subscriptions.length ?
        Utils.getPluralFormFormatted(
            wordForm,
            subscriptions.length) :
        '')
);

export const getChannelsCountString = createSelector(
    [getChannelsCount, getTvChannelsWordForms],
    (channels, wordForm) => (channels ?
        Utils.getPluralFormFormatted(
            wordForm,
            channels) :
        '')
);

export const getTvEquipmentsValueString = createSelector(
  [
    getConnectedMultirooms,
    getConnectedTvConsoles,
    getConnectedTvTariffs,
    getTvEquipmentsValueText
  ],
  (multirooms, consoles, tv, wordForm) =>
    ((multirooms.length + tv.length) && consoles.length ? Utils.format(
        wordForm,
        multirooms.length + tv.length,
        consoles.length) :
        '')
);

export const getTvFullFee = createSelector(
  [
    getConnectedMultirooms,
    getConnectedTvConsoles,
    getConnectedTvTariffs,
    getTvPacketsChanges
  ],
  (multirooms, consoles, tv, packets) =>
    [
      ...multirooms,
      ...consoles,
      ...tv,
      ...((packets || []).added || []),
      ...((packets || []).removed || [])]
      .reduce((acc, b) => {
        let fee = b.fee || 0;

        if (b.type === TvPacketTypes.Concrete) {
          fee = b.connected ? -b.fee : b.fee;
        }

        return acc + fee;
      }, 0)
);

export const getTvFullFeeString = createSelector(
  [getTvFullFee, getOptions],
  (fee, options) =>
    (fee ? `${Utils.formatNum(
        fee,
        NumFormats.FixedHideZero)} ${options.rubSymbol}/${options.monthText}` :
        '')
);

export const getTvFeeString = createSelector(
  [getTv, getOptions],
  (tv, options) =>
    (tv.fee ? `${Utils.formatNum(
    tv.fee,
    NumFormats.FixedHideZero)} ${options.rubSymbol}/${options.monthText}` :
    '')
);

export const getSelectedTv = createSelector(
  [getPresetItems, getTvChangePopup],
  (items, popup) => {
    if (!items || !items.length || !popup) {
      return null;
    }

    const { id } = popup.data || {};

    return items.find(x => x.id === id);
  }
);

export const mapSelectedTvToPopupData = createSelector(
  [getSelectedTv, getTvChannelsWordForms, getOptions],
  (tv, channelsWordForm, options) => {
    if (!tv) {
      return null;
    }

    return {
      title: tv.title,
      channels: tv.value ?
        Utils.getPluralFormFormatted(
        channelsWordForm,
        tv.value) :
        '',
      fee: tv.fee ?
        `${Utils.formatNum(
        tv.fee,
        NumFormats.FixedHideZero)} ${options.rubSymbol}/${options.monthText}` :
        ''
    };
  }
);

export const getNewFee = createSelector(
    [getTvFullFee, getTvFee, getSelectedTv],
    (fullFee, currentFee, selectedTv) => fullFee + (((selectedTv || {}).fee || 0) - currentFee)
);

export const getNewFeeString = createSelector(
    [getNewFee, getOptions],
    (fee, options) => (fee ? `${Utils.formatNum(
        fee,
        NumFormats.FixedHideZero)} ${options.rubSymbol}/${options.monthText}` :
        '')
);
