import { connectAdvanced } from 'react-redux';

import DropDown from 'components/dropdown';

import {
    loadingHouses,
    changingHouse,
    setFormInputFocus
} from 'actions';

import {
    FocusState
} from 'consts';

const mapStateToProps = state => ({
    title: state.settings.housesFieldTitle,
    css: {
        'shpd-lite-request_form-box__narrow tarifs-and-application-request-form_house-box': true,
        'input-search-box __border-hover': true
    },
    items: state.houses,
    isFocus: state.focusState === FocusState.House,
    text: state.selected.houseTitle,
    isDisabled: !state.selected.streetId
});

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state),
        onInput: (term) => {
            dispatch(
                loadingHouses(
                    state.selected.streetId,
                    term));
        },
        change(id, title) {
            dispatch(
                changingHouse(
                    id,
                    title));
        },
        click() {
            dispatch(
                setFormInputFocus(
                    FocusState.House));
        }
    });
}

export default connectAdvanced(selectorFactory)(DropDown);
