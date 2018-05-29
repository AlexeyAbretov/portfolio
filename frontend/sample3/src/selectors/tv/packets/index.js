import { createSelector } from 'reselect';

import {
    getTvPacketsChanges
} from 'selectors/tv';

import {
    getOptions,
    getTvChannelsWordForms
} from 'selectors';

import Utils from 'utils';

import {
    NumFormats
} from 'consts';

const getChanges = createSelector(
    [getTvPacketsChanges, getOptions, getTvChannelsWordForms],
    (changes, options, channelsWordForm) => {
      if (!changes) {
        return [];
      }

      const { added = [], removed = [] } = changes;
      const items = [...added, ...removed];

      return items.map((x) => {
        const connected = !x.connected;
        return {
          id: x.id,
          title: x.title,
          channels: x.channels && !x.isSubscription ?
            Utils.getPluralFormFormatted(
                channelsWordForm,
                x.channels) :
            '',
          fee: x.fee ?
            `${Utils.formatNum(
                x.fee,
                NumFormats.FixedHideZero)} ${options.rubSymbol}/${options.monthText}` :
            '',
          connected
        };
      });
    }
);

export default getChanges;
