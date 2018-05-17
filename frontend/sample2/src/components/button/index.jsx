import React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (this.props.isDisabled) {
            return;
        }

        if (this.props.click) {
            this.props.click(e);
        }
    }

    componentDidMount() {
        if (this.props.isFocus) {
            this.button.focus();
        }
    }

    componentDidUpdate() {
        if (this.props.isFocus) {
            this.button.focus();
        }
    }

    render() {
        const { text, isDisabled } = this.props;

        return (
            <button
                className="button common button__orange-matte __large"
                onClick={this.onClick}
                disabled={isDisabled}
                ref={(elem) => { this.button = elem; }}>
                <span className="label">{text}</span>
            </button>
        );
    }
}
