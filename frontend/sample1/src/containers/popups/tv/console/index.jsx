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
import consoleActions from 'symbiotes/popups/tv/console';

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
      items: getItemsSelector(state),
      note: getNoteSelector(state),
      noteTitle: getNoteTitleSelector(state),
      shippingText: getShippingTextSelector(state),
      buttonTitle: getButtonTitle(state),
      onClose: () => {
        dispatch(actions.popups.close.start(
          PopupNames.TvConsole));
      },

      save: (services) => {
        dispatch(consoleActions.tv.console.save(
          { preset: getPreset(state).id, services }));
      }
    };
  };
}

export default connectAdvanced(selectorFactory)(Popup);
