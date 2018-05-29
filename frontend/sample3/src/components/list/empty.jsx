/* eslint react/prefer-stateless-function:0 */

import PropTypes from 'prop-types';

import React from 'react';

export default class Empty extends React.Component {
  render() {
    const { isVisible } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <div className="content-block common detalization-empty-block">Нет данных за выбранный период</div>
    );
  }
}

Empty.propTypes = {
  isVisible: PropTypes.bool
};

Empty.defaultProps = {
  isVisible: true
};
