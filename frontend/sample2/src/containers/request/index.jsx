import React from 'react';
import { connectAdvanced } from 'react-redux';

import { FormState } from 'consts';

import Button from './button';
import Phone from './fields/phone';
import Tip from './tip';
import Streets from './fields/streets';
import Houses from './fields/houses';
import Flat from './fields/flat';

const request = (props) => {
    if (!props.isVisible) {
        return null;
    }

    return <div>
        <h1 key="title" className="heading-large">{props.title}</h1>
        <div key="subTitle" className="shpd-lite-request_sub-title">{props.subTitle}</div>
        <fieldset key="requestBody" className="shpd-lite-request_form shpd-lite-request_bg-image-box">
            <div className="form-line form-line_dropdown-line">
                <Streets />
                <Houses />
                <Flat />
                <Tip />
            </div>
            <div className="form-line">
                <Phone />
            </div>
            <div className="form-line">
                <div className="shpd-lite-request_form-btn-box">
                    <Button />
                </div>
            </div>
            <div className="form-line align">
                <a href={props.catalogUrl} className="shpd-lite-request_form-link">{props.catalogUrlTitle}</a>
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.background }}></div>
        </fieldset>
    </div>;
}

const mapStateToProps = state => ({
    isVisible: state.formState === FormState.Default,
    title: state.settings.title,
    subTitle: state.settings.subTitle,
    catalogUrlTitle: 'Каталог тарифов',
    catalogUrl: state.settings.catalogUrl,
    background: state.settings.background
});

function selectorFactory(dispatch) {
    return state => ({
        ...mapStateToProps(state)
    });
}

export default connectAdvanced(selectorFactory)(request);
