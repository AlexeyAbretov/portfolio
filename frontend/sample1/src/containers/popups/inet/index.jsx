import { connect } from 'react-redux';

import Popup from 'components/popups/inet';

import
    openStateSelector
from 'selectors/popups/inet';

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
        PopupNames.Inet));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Popup);
