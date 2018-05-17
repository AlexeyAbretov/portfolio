import { connect } from 'react-redux';

import LegalPopup from 'components/popups/legal';

import {
    openStateSelector,
    titleSelector,
    descriptionSelector
} from 'selectors/popups/legal';

import {
    PopupNames
} from 'consts';

import
    actions
from 'symbiotes/popups';

const mapStateToProps = state => ({
  title: titleSelector(state),
  description: descriptionSelector(state),
  isShow: openStateSelector(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(actions.popups.close.start(
        PopupNames.Legal));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LegalPopup);
