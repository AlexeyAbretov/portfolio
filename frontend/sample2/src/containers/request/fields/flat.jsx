import { connectAdvanced } from 'react-redux';

import Input from 'components/input';

import {
    changingFlat,
    setFormInputFocus,
    leaveFlat
} from 'actions';

import {
    FocusState, CheckState
} from 'consts';

const mapStateToProps = state => ({
    title: state.settings.flatFieldTitle,
    mask: [/\d/, /\d/, /\d/, /\d/],
    css: {
        'shpd-lite-request_form-box__narrow': true
    },
    text: state.selected.flat,
    isFocus: state.focusState === FocusState.Flat,
    isDisabled: !state.selected.streetId ||
        !state.selected.houseId ||
        (state.selected.houseId &&
            state.checkState === CheckState.HouseFail &&
            !state.selected.flat)
});

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state),
        blur: (val) => {
            dispatch(changingFlat(val, false));
        },
        click() {
            dispatch(
                setFormInputFocus(
                    FocusState.Flat));
        },
        onInput(val) {
            dispatch(changingFlat(val));
        }
    });
}

export default connectAdvanced(selectorFactory)(Input);
