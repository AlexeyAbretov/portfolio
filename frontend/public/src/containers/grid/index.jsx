import { connect } from 'react-redux';

import Grid from 'components/grid';

import {
  groupsSelector,
  itemsSelector
} from 'selectors/grid';

import
  actions
from 'symbiotes/changes';

import
  popupsActions
from 'symbiotes/popups';

import
  activityActions
from 'symbiotes/activity';

import {
  PopupNames
} from 'consts';

const mapStateToProps = state => ({
  groups: groupsSelector(state),
  items: itemsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  click: (presetId, serviceId) => {
    dispatch(actions.services.toggle.start(presetId, serviceId));
  },

  moreInfoClick: (presetId) => {
    dispatch(popupsActions.popups.open.start(
      PopupNames.Legal, { presetId }));
  },

  setupClick: () => {
    dispatch(activityActions.presets.setup.start());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
