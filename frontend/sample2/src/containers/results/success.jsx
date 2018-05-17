import React from 'react';
import { connectAdvanced } from 'react-redux';

import { FormState } from 'consts';
import Result from 'components/result';

const mapStateToProps = state => {
    const content = state.settings.successContent.replace(
        'XXXX', state.requestId);
    return {
        isVisible: state.formState === FormState.Success,
        content,
        background: state.settings.background
    }
};

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state)
    });
}

export default connectAdvanced(selectorFactory)(Result);
