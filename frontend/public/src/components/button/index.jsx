import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/vendors-ui';

export default class PureButton extends React.PureComponent {
  static defaultProps = {
    className: '',
    text: ''
  }

  render() {
    const { className } = this.props;
    let { text } = this.props;

    if (!text) {
      text = this.props.children;
    }

    return (
      <Button className={className}>{text}</Button>
    );
  }
}

PureButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
};
