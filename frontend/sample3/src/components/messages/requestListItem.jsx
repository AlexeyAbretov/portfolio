import React from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import { DateFormats } from 'consts';

import RequestListItemDetails from './requestListItemDetails';

export default class RequestListItem extends React.Component {

  constructor(props) {
    super(props);
    this.onExpand = this.onExpand.bind(this);

    this.state = { isExpand: false };

    this.statuses = {  // todo уточнить расшифровку статусов
      OPEN: 'Сформированна заявка',
      COMPLETED: 'Обработана',
      REJECTED: 'Отклонена',
      IN_PROGRESS: 'Выпоняется',
      PENDING: 'Пауза',
    };
  }

  onExpand() {
    const isExpand = !this.state.isExpand;
    if (isExpand && !this.props.details) {
      this.props.loadDetails(this.props.id);
    }
    this.setState({ isExpand });
  }

  render() {
    const props = this.props;
    const { isExpand } = this.state;

    const createdAt = moment(props.createdAt);

    const spanCss = classNames({
      'arrow-right': !isExpand,
      'arrow-down': isExpand
    });

    return (
      <div className="block-message read">
        <div className="data-message">
          <div className="col-1" role="button" tabIndex="0" onClick={this.onExpand}>

            <span className={spanCss}>
              <span className="dynamic">{props.title}</span>
            </span>

          </div>
          <div className="col-2">
            <div className="account b-message_home">{props.userLogin} {props.loginDesc}</div>
          </div>
          <div className="col-3">
            <span className="date-massage">{createdAt.format(DateFormats.FullDateWithTimeWithComma)}</span>
          </div>
        </div>

        <div style={{ display: this.state.isExpand && props.details ? 'block' : 'none' }}>
          <RequestListItemDetails details={props.details} />
        </div>

      </div>
    );
  }
}
