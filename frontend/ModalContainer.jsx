import React from 'react';
import { connect } from 'react-redux';

import {
    ModalWrapper,
} from 'ui/organisms';

import PortalModal from 'commons/PortalModal';

import {
    actions as popups,
} from 'symbiotes/popups';

import { PassportChangesPopups } from '../consts';

import {
    getPassportChangesCheckActionPopupContainerProps,
} from '../store/selectors/containers';

import {
    PassportChangesCancelActionContainer,
} from './PassportChangesCancelAction';

import {
    PassportChangesAcceptActionContainer,
} from './PassportChangesAcceptAction';

export const PassportChangesCheckFormContainer = connect(
    getPassportChangesCheckActionPopupContainerProps,
    (dispatch) => ({
        onClose: () => dispatch(popups.close.start({
            name: PassportChangesPopups.CheckPassportChanges,
        })),
    })
)(({
    isShow = false,
    ...props
} = {}) => (
    <PortalModal showing={isShow}>
        <ModalWrapper
            data-testid="passport-check-modal"
            {...props}
        >
            <PassportChangesCancelActionContainer />
            <PassportChangesAcceptActionContainer />
        </ModalWrapper>
    </PortalModal>
));
