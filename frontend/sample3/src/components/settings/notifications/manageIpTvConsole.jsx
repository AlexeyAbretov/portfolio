/* eslint jsx-a11y/no-static-element-interactions:0 */

import PropTypes from 'prop-types';

import React from 'react';

import PseudoLink from 'components/link/pseudo';

import { OperationStatus } from 'consts';
import Utils from 'utils';

import CheckboxWithLabel from '../checkboxWithLabel';
import HideAwaiter from '../../awaiters/hide';
import Button from '../../button';

export default class ManageIpTvConsole extends React.Component {
  constructor(props) {
    super(props);

    this.OnCollapseToggleClick = this.OnCollapseToggleClick.bind(this);
    this.OnSaveClick = this.OnSaveClick.bind(this);
    this.OnRejectClick = this.OnRejectClick.bind(this);
    this.OnStatusChange = this.OnStatusChange.bind(this);
    this.OnHideAwaiterClick = this.OnHideAwaiterClick.bind(this);

    this.state = { showAwaiter: false, collapsed: false, console: { ...this.props.console } };
  }

  OnSaveClick() {
    if (this.props.save) {
      this.props.save(this.state.console);
      this.setState({ showAwaiter: true });
    }
  }

  OnRejectClick() {
    this.setState({ console: { ...this.props.console } });
  }

  OnCollapseToggleClick() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  OnStatusChange(data) {
    this.state.console.notifications = this.state.console.notifications.map((x) => {
      if (x.notificationTypeId === data.value) {
        const notification = { ...x };
        notification.status = data.checked === true ? 0 : 1;
        return notification;
      }
      return x;
    });
  }

  OnHideAwaiterClick() {
    this.setState({ showAwaiter: false });
  }

  render() {
    const notifications = this.state.console.notifications
      .filter(notification => notification.isVisible === true)
      .map(notification => (
        <li>
          <CheckboxWithLabel
            key={notification.notificationTypeId}
            text={notification.notificationName}
            onChange={this.OnStatusChange}
            checked={notification.status === 0}
            disabled={!notification.canChange}
            value={notification.notificationTypeId}
          />
        </li>
    ));

    const message = Utils.getAwaiterMessage(this.props.hideAwaiter.status, {
      Loading: 'Пожалуйста подождите',
      Success: 'Настройки уведомлений изменены',
      Error: 'При изменении уведомлений произошла ошибка. Попробуйте позднее'
    });

    const isCurrentAwaiter = this.props.hideAwaiter.consoleId === this.props.console.consoleId;

    return (
      <div className="block-device foldable opened">
        <div className="name-device">
          <h4 className="bold">
            <span className="before" />
            <span className="dynamic" onClick={this.OnCollapseToggleClick}>{this.props.console.consoleType}</span>
          </h4>
          <span className="italic" data-bind="text: Label" />
        </div>
        <div className="inform-events folded tv-consoles" style={{ display: this.state.collapsed ? 'none' : 'block' }}>
          <ul className="blank tv-consoles">
            {notifications}
          </ul>
          <div className="submit-or-cancel">
            <div className="awaiter-message margin-bottom-14 mright30">
              <HideAwaiter
                message={message}
                showAwaiter={this.state.showAwaiter && this.props.hideAwaiter.status && isCurrentAwaiter}
                status={this.props.hideAwaiter.status}
                hideAwaiter={this.OnHideAwaiterClick}
                css={{ italic: true, 'message-text': true, 'valign-middle-cell': true }}
              />
            </div>
            <div
              style={{ display:
                this.props.hideAwaiter.status === OperationStatus.Pending && isCurrentAwaiter ? 'none' : '' }}
            >
              <Button text={this.props.saveText} cssClass="sub label" isDisabled={false} click={this.OnSaveClick} />
              <span className="or">{this.props.orText}</span>
              <PseudoLink text={this.props.rejectText} css={{ lh100: true }} click={this.OnRejectClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ManageIpTvConsole.propTypes = {
  saveText: PropTypes.string,
  orText: PropTypes.string,
  rejectText: PropTypes.string,
};

ManageIpTvConsole.defaultProps = {
  saveText: 'Сохранить',
  orText: 'или',
  rejectText: 'Отменить изменения',
};
