/* eslint jsx-a11y/no-static-element-interactions:0 */
/* eslint react/no-danger:0 */

import PropTypes from 'prop-types';

import React from 'react';
import classNames from 'classnames/bind';
import { OperationStatus } from 'consts';

export default class HideAwaiter extends React.Component {
  constructor(props) {
    super(props);

    this.HideAwaiterClick = this.HideAwaiterClick.bind(this);
  }

  HideAwaiterClick() {
    if (this.props.hideAwaiter) {
      this.props.hideAwaiter(!this.props.showAwaiter);
    }
  }
  render() {
    const { status, message, showAwaiter } = this.props;

    if (!showAwaiter) {
      return null;
    }

    switch (status) {
      case OperationStatus.Pending:
        return (
          <div
            className={classNames({ status: true, status_loading: true, ...this.props.css })}
            style={{ paddingLeft: '45px', marginLeft: '8px' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        );
      case OperationStatus.Success:
        return (
          <div className="yellow-box-change-success">
            <span className="close-icon" onClick={this.HideAwaiterClick} />
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </div>
        );
      case OperationStatus.Fail:
      case OperationStatus.CustomError:
        return (
          <div className="error-box valign-middle-cell">
            <span className="italic message-text valign-middle-cell" dangerouslySetInnerHTML={{ __html: message }} />
          </div>
        );
      default:
        return null;
    }
  }
}

HideAwaiter.propTypes = {
  message: PropTypes.string,
  status: PropTypes.number,
  showAwaiter: PropTypes.bool
};

HideAwaiter.defaultProps = {
  message: '',
  status: -1,
  showAwaiter: false
};
