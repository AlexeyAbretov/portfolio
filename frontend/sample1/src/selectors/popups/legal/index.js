import { createSelector } from 'reselect';

import { getOpenedPopups, getPresets, getOptions } from 'selectors';

import { PopupNames } from 'consts';

export const openStateSelector = createSelector(
  [getOpenedPopups],
  opened => !!opened.find(x => x.name === PopupNames.Legal)
);

export const titleSelector = createSelector(
  [openStateSelector, getOpenedPopups, getPresets, getOptions],
  (isOpen, opened, presets, options) => {
    if (!isOpen) {
      return '';
    }

    const openedLegalPopup = opened.find(x => x.name === PopupNames.Legal);

    const { data = {} } = openedLegalPopup;

    const preset = presets.find(x => x.id === data.presetId);
    return (options.legalPopupTitle || '{0}').replace(
      '{0}',
      (preset || {}).name
    );
  }
);

export const descriptionSelector = createSelector(
  [openStateSelector, getOpenedPopups, getPresets],
  (isOpen, opened, presets) => {
    if (!isOpen) {
      return '';
    }

    const openedLegalPopup = opened.find(x => x.name === PopupNames.Legal);

    const { data = {} } = openedLegalPopup;

    const preset = presets.find(x => x.id === data.presetId);

    return (preset || {}).description;
  }
);
