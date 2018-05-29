import { connectAdvanced } from 'react-redux';

import Packages from 'components/tv/packets';

import {
  PopupsNames
} from 'consts';

import
  actions
from 'symbiotes/changes';

import
  popupActions
from 'symbiotes/popups';

import {
  getGroupsWithItemsViaChanges,
  getTv,
  getPackages,
  getTvPacketsChanges
} from 'selectors/tv';

import {
  getPreset
} from 'selectors/presets';

const mapStateToProps = state => ({
  items: getGroupsWithItemsViaChanges(state),
  saveText: state.options.saveButtonText,
  hasChanges: !!getTvPacketsChanges(state).added
});

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    change(id) {
      dispatch(actions.services.toggle.start(
        `${getPreset(state).id}_${getTv(state).id}`,
        getPackages(state).find(x => x.id === id))
      );
    },

    showPopup() {
      dispatch(popupActions.popups.open.start(
        PopupsNames.Tv.Packages.Change,
        null));
    }
  });
}

export default connectAdvanced(
  selectorFactory
)(Packages);
