import { connectAdvanced } from 'react-redux';

import Input from 'components/input';

import {
    changingPhone,
    setFormInputFocus,
    leavePhone
} from 'actions';

import {
    FocusState
} from 'consts';

const mapStateToProps = state => ({
    title: state.settings.phoneFieldTitle,
    mask: ['\+', '7', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    css: {
        'shpd-lite-request_form-box__wide': true
    },
    isFocus: state.focusState === FocusState.Phone,
    isDisabled: false
});

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state),
        pressEnter: (val) => {
            dispatch(changingPhone(val));
        },
        blur: (val) => {
            dispatch(changingPhone(val));
        },
        onInput(val) {
            dispatch(changingPhone(val, false));
        },
        click() {
            dispatch(
                setFormInputFocus(
                    FocusState.Phone));
        }
    });
}

export default connectAdvanced(selectorFactory)(Input);
