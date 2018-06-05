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
    getPreset
} from 'selectors/popups/wifi/router';

import {
    PopupNames
} from 'consts';

import actions from 'symbiotes/popups';
import changesActions from 'symbiotes/changes';

function selectorFactory(dispatch) {
  return state => ({
    isShow: openStateSelector(state),
    title: getTitleSelector(state),
    description: getDescriptionSelector(state),
    cancelTitle: getCancelTitleSelector(state),
    addTitle: getAddTitleSelector(state),
    continueTitle: getContinueTitleSelector(state),
    items: getItemsSelector(state),
    onClose: () => {
      dispatch(actions.popups.close.start(
                PopupNames.WifiRouter));
    },

    save: (serviceId) => {
      dispatch(changesActions.services.toggle.start(
        getPreset(state).id, serviceId));
      dispatch(actions.popups.close.start(
        PopupNames.WifiRouter));
    }
  });
}

export default connectAdvanced(selectorFactory)(Popup);
