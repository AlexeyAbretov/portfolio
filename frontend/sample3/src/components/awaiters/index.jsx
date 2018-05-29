/* eslint react/prefer-stateless-function:0 */
/* eslint jsx-a11y/label-has-for:0 */
/* eslint react/forbid-prop-types: 0 */
/* eslint jsx-a11y/no-static-element-interactions:0 */

import PropTypes from 'prop-types';

import React from 'react';
import classNames from 'classnames/bind';

import { OperationStatus } from 'consts';

export default class Awaiter extends React.Component {
  render() {
    const { status, message, css } = this.props;
    const isVisible = !!status;

    if (!isVisible) {
      return null;
    }

    let statusCss = {
      status: true,
      status_loading: true
    };

    switch (status) {
      case OperationStatus.Success:
        statusCss = {
          'yellow-box-change-success': true
        };
        break;
      case OperationStatus.Fail:
        statusCss = {
          'error-box': true
        };
        break;
      case OperationStatus.CustomError:
        statusCss = {
          'services-dashed-block': true,
          'dashed-box': true,
          mtop20: true
        };
        break;
      default:
    }

    const itemCss = classNames({
      statusCss,
      ...css
    });

    return (
      <div className={itemCss}>
        {message}
      </div>
    );
  }
}

Awaiter.propTypes = {
  message: PropTypes.string,
  status: PropTypes.number,
  css: PropTypes.object
};

Awaiter.defaultProps = {
  message: '',
  status: 1,
  css: null
};
