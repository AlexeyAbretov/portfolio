/* eslint jsx-a11y/no-static-element-interactions:0 */
/* eslint react/no-danger:0 */
/* eslint no-script-url:0 */

import PropTypes from 'prop-types';

import React from 'react';
import { OperationStatus } from 'consts';

export default class BlockAwaiter extends React.Component {
  constructor(props) {
    super(props);

    this.NavigateToHistoryClick = this.NavigateToHistoryClick.bind(this);
  }

  NavigateToHistoryClick() {
    if (this.props.navigate) {
      this.props.navigate();
    }
  }
  render() {
    const { status, message } = this.props;

    switch (status) {
      case OperationStatus.Pending:
        return (
          <div
            className="status status_loading"
            style={{ paddingLeft: '45px', paddingTop: '24px', paddingBottom: '22px' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        );
      case OperationStatus.Success:
        return (
          <div className="services-dashed-block dashed-box">
            <div className="ft" />
            <div className="fm">
              <div className="fmr">
                Заявка номер {this.props.requestId} принята, за статусом следите в разделе
                <a href="javascript:void(0)" onClick={this.NavigateToHistoryClick} className="dynamic">Сообщения</a>.
              </div>
            </div>
            <div className="fb" />
          </div>
        );
      case OperationStatus.Fail:
      case OperationStatus.CustomError:
        return (
          <div className="error-box margin-22-top">
            <div className="valign-middle-cell" dangerouslySetInnerHTML={{ __html: message }} />
          </div>
        );
      default:
        return null;
    }
  }
}

BlockAwaiter.propTypes = {
  message: PropTypes.string,
  status: PropTypes.number
};

BlockAwaiter.defaultProps = {
  message: '',
  status: -1
};
