import { connectAdvanced } from 'react-redux';

import Popup from 'components/popups/inet';

import {
  getRubSymbol
} from 'selectors';

import {
  openStateSelector,
  getPreset,
  getTitleSelector,
  getAddTitleSelector,
  getContinueTitleSelector,
  getCancelTitleSelector,
  getItemsSelector,
  getSupportService,
  getSpeedChangeText,
  getSpeedSelectText,
  getConnectedVsu,
  getOncePriceChangeSpeedText
} from 'selectors/popups/inet';

import {
  PopupNames
} from 'consts';

import actions from 'symbiotes/popups';
import changesActions from 'symbiotes/changes';

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

      speedChangeText: getSpeedChangeText(state),
      speedSelectText: getSpeedSelectText(state),

      items: getItemsSelector(state),
      support: getSupportService(state),
      connectedVsu: getConnectedVsu(state),
      oncePriceChangeSpeedText: getOncePriceChangeSpeedText(state),
      rubSymbol: getRubSymbol(state),

      onClose: () => {
        dispatch(actions.popups.close.start(
          PopupNames.Inet));
      },

      save: (serviceId) => {
        dispatch(changesActions.services.toggle.start(
          getPreset(state).id, serviceId));
        dispatch(actions.popups.close.start(
          PopupNames.Antivir));
      }
    };
  };
}

export default connectAdvanced(selectorFactory)(Popup);
