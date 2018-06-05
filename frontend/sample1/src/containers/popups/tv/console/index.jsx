import { connectAdvanced } from 'react-redux';

import Popup from 'components/popups/tv/console';

import {
    openStateSelector,
    getTitleSelector,
    getDescriptionSelector,
    getItemsSelector,
    getNoteTitleSelector,
    getNoteSelector,
    getShippingTextSelector,
    getPreset
} from 'selectors/popups/tv/console';

import {
    getButtonTitle
} from 'selectors';

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
    items: getItemsSelector(state),
    note: getNoteSelector(state),
    noteTitle: getNoteTitleSelector(state),
    shippingText: getShippingTextSelector(state),
    buttonTitle: getButtonTitle(state),
    onClose: () => {
      dispatch(actions.popups.close.start(
        PopupNames.TvConsole));
    },

    save: (serviceId) => {
      dispatch(changesActions.services.toggle.start(
        getPreset(state).id, serviceId));
      dispatch(actions.popups.close.start(
        PopupNames.TvConsole));
    }
  });
}

export default connectAdvanced(selectorFactory)(Popup);
