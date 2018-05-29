/* eslint react/prefer-stateless-function:0 */

import PropTypes from 'prop-types';

import React from 'react';

export default class GreenBox extends React.Component {
  render() {
    const { text, isVisible, type = 'green' } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <span className={`${type}-rounded-block italic`} style={{ marginLeft: 0 }}>
        {text}
      </span>
    );
  }
}

GreenBox.propTypes = {
  isVisible: PropTypes.bool
};

GreenBox.defaultProps = {
  isVisible: true
};
