import { connect } from 'react-redux';

import Popup from 'components/popups/antivir';

import
    openStateSelector
from 'selectors/popups/antivir';

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
        PopupNames.Antivir));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Popup);
