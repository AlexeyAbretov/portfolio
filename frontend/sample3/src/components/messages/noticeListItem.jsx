/* eslint no-unused-vars: 0 */
import React from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import {
  DateFormats,
  UserNotificationStatus
} from 'consts';

import Checkbox from '../checkbox';

export default class NoticeListItem extends React.Component {

  constructor(props) {
    super(props);

    this.onExpand = this.onExpand.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.state = {
      isExpand: false,
      checked: false
    };
  }

  onExpand() {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  }

  onCheck() {
    this.setState({ checked: !this.props.checked });
    if (this.props.onCheck) {
      this.props.onCheck(this.props.id, !this.props.checked);
    }
  }

  onRemove() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.id);
    }
  }

  render() {
    const props = this.props;
    const createdAt = moment(props.createdAt);

    const { isExpand, checked } = this.state;

    const spanCss = classNames({
      'arrow-right': !isExpand,
      'arrow-down': isExpand
    });

    const rowCss = classNames({
      'block-notification': true,
      'not-read': props.status <= UserNotificationStatus.Unread,
      selected: checked,
      read: props.status > UserNotificationStatus.Unread
    });

    const display = {
      display: isExpand ? 'block' : 'none'
    };

    return (

      <div className={rowCss}>
        <div className="selection-column">
          <Checkbox checked={props.checked} onChange={this.onCheck} />
        </div>
        <div className="data-column">
          <div className="line-notif">
            <div className="left-col">
              <span className={spanCss} onClick={this.onExpand} role="button" tabIndex="0">
                <span className="global">{props.title}</span>
              </span>
            </div>
            <div className="right-col">
              <span className="date-notif">{createdAt.format(DateFormats.FullDateWithTimeWithComma)}</span>
              <span className="remove-dyn" style={display} onClick={this.onRemove} role="button" tabIndex="0">
                <span className="dynamic">Удалить</span>
              </span>
            </div>
          </div>
          <div className="line-notif" style={display}>
            <div className="left-col">
              <div className="text-notif">{props.text}</div>
              <div className="text-notif">
                <span>Номер уведомления:</span>&nbsp;<span>{props.id}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}
