import { connect } from 'react-redux';

import Popup from 'components/popups/tv';

import
    openStateSelector
from 'selectors/popups/tv';

import {
    PopupNames
} from 'consts';

import
    actions
from 'symbiotes/popups';

const mapStateToProps = state => ({
  isShow: openStateSelector(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(actions.popups.close.start(
        PopupNames.Tv));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Popup);
