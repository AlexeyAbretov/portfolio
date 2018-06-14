import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/vendor-ui';

export default class PureButton extends React.PureComponent {
  static defaultProps = {
    className: '',
    text: ''
  }

  render() {
    const { className, click, disabled } = this.props;
    let { text } = this.props;

    if (!text) {
      text = this.props.children;
    }

    return (
      <Button className={className} onClick={click} disabled={disabled}>{text}</Button>
    );
  }
}

PureButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  click: PropTypes.func,
  disabled: PropTypes.bool
};

PureButton.defaultProps = {
  className: '',
  text: '',
  click: () => {},
  disabled: false
};
