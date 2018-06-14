import { connectAdvanced } from 'react-redux';

import Popup from 'components/popups/antivir';

import {
  openStateSelector,
  getPreset,
  getTitleSelector,
  getAddTitleSelector,
  getContinueTitleSelector,
  getCancelTitleSelector,
  getItemsSelector,
  getDetailsTitleSelector,
  getSortedGroups,
  getSelectionNote,
  getEmailNote,
  getMappedSelectionNote,
  getMappedItem
} from 'selectors/popups/antivir';

import {
  PopupNames
} from 'consts';

import actions from 'symbiotes/popups';
import antivirActions from 'symbiotes/popups/antivir';

function selectorFactory(dispatch) {
  return (state) => {
    const isShow = openStateSelector(state);
    if (!isShow) {
      return {
        isShow
      };
    }

    return {
      isShow,
      title: getTitleSelector(state),
      addTitle: getAddTitleSelector(state),
      continueTitle: getContinueTitleSelector(state),
      cancelTitle: getCancelTitleSelector(state),
      detailsTitle: getDetailsTitleSelector(state),
      selectionNote: getSelectionNote(state),
      mappedSelectionNote: getMappedSelectionNote(state),
      emailNote: getEmailNote(state),

      items: getItemsSelector(state),
      groups: getSortedGroups(state),

      mappedItem: getMappedItem(state),

      onClose: () => {
        dispatch(actions.popups.close.start(
          PopupNames.Antivir));
      },

      save: (services) => {
        dispatch(antivirActions.antivir.save(
          { preset: getPreset(state).id, services }));
      }
    };
  };
}

export default connectAdvanced(selectorFactory)(Popup);
