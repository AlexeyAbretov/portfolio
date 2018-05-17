import React from 'react';
import { connectAdvanced } from 'react-redux';

import { FormState } from 'consts';
import Result from 'components/result';

const mapStateToProps = state => ({
    isVisible: state.formState === FormState.Fail,
    content: state.settings.failContent,
    background: state.settings.background
});

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state)
    });
}

export default connectAdvanced(selectorFactory)(Result);
