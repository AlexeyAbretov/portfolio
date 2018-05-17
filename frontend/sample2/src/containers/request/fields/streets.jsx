import React from 'react';
import { connectAdvanced } from 'react-redux';

import DropDown from 'components/dropdown';
import Region from './region';

import {
    loadingStreets,
    changingStreet,
    setFormInputFocus
} from 'actions';

import {
    FocusState
} from 'consts';

const mapStateToProps = state => ({
    title: [
        <span key="streetTitle">{state.settings.streetsFieldTitle}&nbsp;</span>,
        <Region key="region"/>
    ],
    css: {
        '__dropdown-box shpd-lite-request_form-box__wide': true,
        'tarifs-and-application-request-form_street-box input-search-box __border-hover': true
    },
    items: state.streets,
    isFocus: state.focusState === FocusState.Street,
    text: state.selected.streetTitle,
    isDisabled: false
});

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state),
        onInput: (term) => {
            dispatch(setFormInputFocus(
                FocusState.Street));
            dispatch(
                loadingStreets(
                    state.selected.regionTitle,
                    state.selected.regionId,
                    term));
        },
        change(id, title) {
            dispatch(
                changingStreet(
                    id,
                    title));
        },
        click() {
            dispatch(
                setFormInputFocus(
                    FocusState.Street));
        }
    });
}

export default connectAdvanced(selectorFactory)(DropDown);
