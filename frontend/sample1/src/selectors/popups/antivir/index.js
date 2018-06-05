import { createSelector } from 'reselect';

import { getOpenedPopups } from 'selectors';

import { PopupNames } from 'consts';

export default createSelector(
  [getOpenedPopups],
  opened => !!opened.find(x => x.name === PopupNames.Antivir)
);
