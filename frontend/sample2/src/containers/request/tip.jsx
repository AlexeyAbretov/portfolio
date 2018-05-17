import { connect } from 'react-redux';

import Tip from 'components/tip';
import { CheckState } from 'consts';

const mapStateToProps = state => ({
    isVisible: state.checkState !== CheckState.Success,
    text: state.checkState === CheckState.HouseFail ?
        state.settings.checkResultText :
        state.settings.checkFlatResultText
});

export default connect(mapStateToProps)(Tip);
