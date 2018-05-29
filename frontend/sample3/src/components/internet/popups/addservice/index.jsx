/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames/bind';
import { Switch, Button, Loader } from 'components/vendor-ui';
import { OperationStatus } from 'consts';

import layoutStyle from '../../styles.css';
import style from '../../../popup/styles.css';

const cx = classNames.bind(layoutStyle);

export default class AddservicePopup extends React.Component {
  constructor(props) {
    super(props);

    this.saveClick = this.saveClick.bind(this);
  }

  saveClick() {
    if (this.props.connectService) {
      this.props.connectService(this.props.service);
    }
  }

  render() {
    const {
      title,
      description,
      speedText,
      currencyAndDelayText,
      toText,
      saveAddText,
      saveRemoveText,
      service,
      fullFee,
      addServiceAwaiter,
      successText,
      failText
    } = this.props;

    const descriptionText = `${
      description.description} ${
      service.connected === true ? description.decrease : description.increase} ${
      service.connected === true ? fullFee - service.fee : fullFee + service.fee} ${
      currencyAndDelayText}`;

    let content = (
      <React.Fragment>
        <div className={cx('lk-internet__row',
            style['lk-internet__row--popup-layout'],
            style['lk-internet__row--popup-layout-first'],
           )}
        >
          <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-left-common'])}>
            <Switch isFuture checked={service.connected !== true} />
          </div>
          <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-middle'])}>
            <div className={cx('lk-internet__sub-row')}>
              <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--first')}>
                <div className={cx('lk-internet__option-name')}>{service.title}</div>
              </div>
              <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--second')}>
                <span>{toText} {service.benefit} {speedText}</span>
              </div>
            </div>
          </div>
          <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-right'])}>
            <span className={cx('lk-internet__tile-cost')}>
              {service.fee} {currencyAndDelayText}
            </span>
          </div>
        </div>
        <div className={cx(style['lk-internet__popup-clarification'])}>
          {descriptionText}
        </div>
        <div className={cx(style['lk-internet__popup-btn-container'])}>
          <Button className={'big'} onClick={this.saveClick}>
            {service.connected === true ? saveRemoveText : saveAddText}
          </Button>
        </div>
      </React.Fragment>
    );

    switch (addServiceAwaiter.status) {
      case OperationStatus.Pending:
        content = (
          <div className={cx(style['lk-internet__popup-title-note--centered'])}>
            <Loader size="small" active lastIcon="clock" timeout={250}>{[]}</Loader>
          </div>
        );
        break;
      case OperationStatus.Success:
        content = (
          <div>
            <h3 className={cx(style['lk-internet__popup-title-note--centered'])}>{successText}</h3>
          </div>
        );
        break;
      case OperationStatus.Fail:
        content = (
          <div>
            <h3 className={cx(style['lk-internet__popup-title-note--centered'])}>{failText}</h3>
          </div>
        );
        break;
      default:
        break;
    }

    return (
      <div className={cx(style['lk-internet__popup'])}>
        <h2
          className={cx(style['lk-internet__popup-title--centered'], style['lk-internet__popup-title'])}
        >
          {title} «{service.title}»
        </h2>
        {content}
      </div>
    );
  }
}
