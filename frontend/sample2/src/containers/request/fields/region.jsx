import { connectAdvanced } from 'react-redux';

import Region from 'components/region';

import {
    changingRegion,
    setFormInputFocus
} from 'actions';

import {
    FocusState
} from 'consts';

const mapStateToProps = state => ({
    current: {
        id: state.selected.regionId,
        title: state.selected.regionTitle
    },
    isFocus: state.focusState === FocusState.City,
    items: state.regions
});

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state),
        change: (id, title) => {
            dispatch(changingRegion(id, title));
        },

        click: () => {
            dispatch(setFormInputFocus(FocusState.City));
        }
    });
}

export default connectAdvanced(selectorFactory)(Region);
