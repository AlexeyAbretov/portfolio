import React from 'react';
import classNames from 'classnames/bind';

import {
    KeyCodes
} from 'consts';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            text: '',
            pos: null,
            clear: false
        };

        this.input = this.input.bind(this);
        this.change = this.change.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.click = this.click.bind(this);

        this.searching = null;

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(e) {
        const state = {
            isOpen: false
        };

        if (this.inputField !== e.target &&
            e.target.className.indexOf('mCSB_dragger_bar') === -1 &&
            e.target.className.indexOf('mCSB_draggerRail') === -1) {
            this.setState(state);
        }
    }

    click() {
        if (this.props.click) {
            this.props.click();
        }
    }

    input(e) {
        const text = e.target.value;
        this.setState({
            text,
            pos: null,
            clear: true
        });

        const fn = function (val) {
            this.setState({
                isOpen: true
            });

            if (this.props.onInput) {
                this.props.onInput(text);
            }
        }.bind(this);

        clearTimeout(this.searching);

        this.searching = setTimeout(fn, 500);
    }

    change(id, title) {
        this.setState({
            text: title,
            isOpen: false,
            clear: false
        });

        const fn = function () {
            if (this.props.change) {
                this.props.change(id, title);
            }
        }.bind(this);

        setTimeout(fn, 100);
    }

    keyUp(e) {
        e = e || event;
        const key = e.keyCode || e.which;

        let { text, pos } = this.state;
        const { items } = this.props;

        if (!items || !items.length) {
            return;
        }

        switch (key) {
            // down
            case KeyCodes.Down:
                if (pos === null || pos >= (items.length - 1)) {
                    pos = 0;
                } else {
                    pos += 1;
                }

                text = items[pos].label;

                break;
            // up
            case KeyCodes.Up:
                if (pos === null || pos <= 0) {
                    pos = items.length - 1;
                } else {
                    pos -= 1;
                }

                text = items[pos].label;

                break;
            // enter
            case KeyCodes.Enter:
                if (pos !== null) {
                    const { id, label } = items[pos];
                    this.change(id, label);
                } else if (items.length) {
                    const { id, label } = items[0];
                    this.change(id, label);
                }
                return;
            default:
                break;
        }

        this.setState({
            text,
            pos
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: this.state.isOpen ?
                this.state.text :
                nextProps.text || '',
            clear: false
        });
    }

    componentDidMount() {
        if (this.props.isFocus) {
            this.inputField.focus();
        }

        if (document) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (document) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    componentDidUpdate() {
        if (this.props.isFocus) {
            this.inputField.focus();
        }
    }

    render() {
        let { items, css, title, isDisabled } = this.props;
        const { isOpen, text, clear } = this.state;

        if (clear) {
            items = [];
        }

        const classes = classNames({
            'form-box': true,
            ...css
        });

        const dropItems = (items || []).map(
            x => <li key={x.id} onClick={() => this.change(x.id, x.label)}>{x.label}</li>
        );

        const visible = isOpen && dropItems.length ?
            {
                display: 'block'
            } :
            null;

        return (
            <div className={classes}>
                <label>{title}</label>
                <div>
                    <div className="input shpd-lite-request_form-field active">
                        <input
                            type="text"
                            value={text} onChange={this.input}
                            onKeyUp={this.keyUp}
                            onClick={this.click}
                            disabled={isDisabled}
                            ref={(elem) => { this.inputField = elem; }} />
                    </div>
                </div>
                <ul className="drop" style={visible}>
                    {dropItems}
                </ul>
            </div>
        );
    }
}
