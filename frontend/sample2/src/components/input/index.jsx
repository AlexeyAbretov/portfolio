import React from 'react';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames/bind';

import {
    KeyCodes
} from 'consts';

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.blur = this.blur.bind(this);
        this.click = this.click.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.input = this.input.bind(this);

        this.searching = null;
    }

    input(e) {
        const text = e.target.value;

        const fn = function (val) {
            if (this.props.onInput) {
                this.props.onInput(text);
            }
        }.bind(this);

        clearTimeout(this.searching);

        this.searching = setTimeout(fn, 500);
    }

    keyUp(e) {
        e = e || event;
        const key = e.keyCode || e.which;

        switch (key) {
            // enter
            case KeyCodes.Enter:
                if (!this.props.isDisabled &&
                    this.props.pressEnter) {
                    this.props.pressEnter(e.target.value);
                }
                return;
            default:
                break;
        }
    }

    click() {
        if (!this.props.isDisabled &&
            this.props.click) {
            this.props.click();
        }
    }

    blur(e) {
        if (!this.props.isDisabled &&
            this.props.blur) {
            this.props.blur(e.target.value);
        }
    }

    componentDidMount() {
        if (!this.props.isDisabled &&
            this.props.isFocus) {
            this.inputField.focus();
        }
    }

    componentDidUpdate() {
        if (!this.props.isDisabled &&
            this.props.isFocus) {
            this.inputField.focus();
        }
    }

    render() {
        const { title, mask, css, text, isDisabled } = this.props;

        const classes = classNames({
            'form-box': true,
            ...css
        });

        return (
            <div className={classes}>
                <label>{title}</label>
                <div className="input shpd-lite-request_form-field">
                    <MaskedInput
                        mask={mask}
                        onBlur={this.blur}
                        guide={false}
                        value={text}
                        onClick={this.click}
                        onChange={this.input}
                        onKeyUp={this.keyUp}
                        disabled={isDisabled}
                        ref={(elem) => { this.inputField = (elem || {}).inputElement; }} />
                </div>
            </div>
        );
    }
}
