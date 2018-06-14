import { connectAdvanced } from 'react-redux';

import Popup from 'components/popups/wifi/router';

import {
    openStateSelector,
    getTitleSelector,
    getDescriptionSelector,
    getItemsSelector,
    getCancelTitleSelector,
    getAddTitleSelector,
    getContinueTitleSelector,
    getPreset,
    getNote
} from 'selectors/popups/wifi/router';

import {
    PopupNames
} from 'consts';

import actions from 'symbiotes/popups';
import wifiActions from 'symbiotes/popups/wifi';

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
      description: getDescriptionSelector(state),
      cancelTitle: getCancelTitleSelector(state),
      addTitle: getAddTitleSelector(state),
      continueTitle: getContinueTitleSelector(state),
      note: getNote(state),
      items: getItemsSelector(state),
      onClose: () => {
        dispatch(actions.popups.close.start(
        PopupNames.WifiRouter));
      },

      save: (services) => {
        dispatch(wifiActions.wifi.router.save(
          { preset: getPreset(state).id, services }));
      }
    };
  };
}

export default connectAdvanced(selectorFactory)(Popup);
