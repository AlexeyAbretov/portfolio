import { connectAdvanced } from 'react-redux';

import TvChangeBlock from 'components/tv/info/change';

import
  actions
from 'symbiotes/tv';

import {
  getAvailableTvTariffs
} from 'selectors/presets';

import {
  getToggleChangeBlockActivity
} from 'selectors/activity';

const mapStateToProps = (state) => {
  const items = getAvailableTvTariffs(state);

  return {
    items,
    show: (items || []).length > 0 &&
      (getToggleChangeBlockActivity(state) || {}).status
  };
};

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    change(id) {
      dispatch(actions.tv.select.start(
        id)
      );
    }
  });
}

export default connectAdvanced(
  selectorFactory
)(TvChangeBlock);
