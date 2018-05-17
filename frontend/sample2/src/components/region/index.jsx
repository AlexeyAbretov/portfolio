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
            filter: ''
        };

        this.open = this.open.bind(this);
        this.change = this.change.bind(this);
        this.filter = this.filter.bind(this);
        this.click = this.click.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.input = this.input.bind(this);

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    open() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    change(id, title) {
        if (this.props.change) {
            this.props.change(id, title);
        }

        this.setState({
            isOpen: false
        });
    }

    filter() {
        this.setState({
            filter: this.inputField.value,
            pos: null
        });
    }

    click() {
        if (this.props.click) {
            this.props.click();
        }
    }

    keyUp(e) {
        e = e || event;
        const key = e.keyCode || e.which;

        let { text, pos, filter } = this.state;
        const { items } = this.props;

        const filtered = items.filter(x => filter.length < 3 ?
            true :
            x.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

        if (!filtered || !filtered.length) {
            return;
        }

        switch (key) {
            // down
            case KeyCodes.Down:
                if (pos === null || pos >= (filtered.length - 1)) {
                    pos = 0;
                } else {
                    pos += 1;
                }

                text = filtered[pos].title;

                break;
            // up
            case KeyCodes.Up:
                if (pos === null || pos <= 0) {
                    pos = filtered.length - 1;
                } else {
                    pos -= 1;
                }

                text = filtered[pos].title;

                break;
            // enter
            case KeyCodes.Enter:
                if (pos !== null) {
                    const { id, title } = filtered[pos];
                    this.change(id, title);
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

    input(e) {
        this.setState({
            text: e.target.value,
            filter: e.target.value,
            pos: null
        });
    }

    handleClickOutside(e) {
        const state = {
            isOpen: false
        };

        if (this.inputField !== e.target &&
            this.searchIcon !== e.target &&
            this.list !== e.target &&
            this.ul !== e.target &&
            e.target.className.indexOf('mCSB_dragger_bar') === -1 &&
            e.target.className.indexOf('mCSB_draggerRail') === -1) {
            this.setState(state);
        }
    }

    componentDidMount() {
        if (this.list && typeof $ !== 'undefined') {
            // note: в верстке используется mCustomScrollbar 
            $(this.list).mCustomScrollbar();
        }

        if (document) {
            document.addEventListener('click', this.handleClickOutside, true);
        }

        if (this.props.isFocus) {
            this.inputField.focus();
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
        const { items, css, current } = this.props;
        const { isOpen, text, filter } = this.state;

        const classes = classNames({
            'dropdown-tip-list': true,
            ...css
        });

        const dropItems = (items || [])
            .filter(x => filter.length < 3 ?
                true :
                x.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            .map(
            x => <li key={x.id} onClick={() => this.change(x.id, x.title)}>
                <span className="dynamic">{x.title}</span>
            </li>
            );

        const visible = classNames({
            'dropdown-tip-list_dropdown': true,
            show: isOpen
        });

        return (
            <span className={classes}>
                <span className="dynamic js-dropdown-tip-list" onClick={this.open}>{current.title}</span>
                <span className={visible}>
                    <span className="dropdown-tip-list_dropdown-search">
                        <div className="input shpd-lite-request_form-field">
                            <input
                                type="text"
                                className="dropdown-tip-list_dropdown-search-input"
                                onKeyUp={this.keyUp}
                                onChange={this.input}
                                onClick={this.click}
                                value={text}
                                ref={(elem) => { this.inputField = elem; }} />
                            <span
                                className="dropdown-tip-list_dropdown-search-icon"
                                ref={(elem) => { this.searchIcon = elem; }}
                                onClick={this.filter}></span>
                        </div>
                    </span>
                    <span
                        className="dropdown-tip-list_dropdown-list"
                        ref={(elem) => { this.list = elem; }}>
                        <ul ref={(elem) => { this.ul = elem; }}>
                            {dropItems}
                        </ul>
                    </span>
                </span>
            </span>);
    }
}
