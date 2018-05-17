import { connectAdvanced } from 'react-redux';

import Button from 'components/button';

import {
    sendingRequest
} from 'actions';

import {
    FocusState,
    CheckState
} from 'consts';

const mapStateToProps = state => ({
    isDisabled: !state.isFormValid ||
        state.checkState !== CheckState.Success,
    text: 'Подключить',
    isFocus: state.focusState === FocusState.Button,
});

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state),
        click: () => {
            dispatch(sendingRequest());
        }
    });
}

export default connectAdvanced(selectorFactory)(Button);
