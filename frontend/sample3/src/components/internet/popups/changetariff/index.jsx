/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames/bind';
import { Switch, Button, Loader } from 'components/vendor-ui';
import { OperationStatus } from 'consts';
import style from 'components/popup/styles.css';

import layoutStyle from '../../styles.css';

const cx = classNames.bind(layoutStyle);

export default class ChangetariffPopup extends React.Component {
  constructor(props) {
    super(props);

    this.toggleChangetariff = this.toggleChangetariff.bind(this);
    this.saveClick = this.saveClick.bind(this);

    this.state = { toggleChangetariff: true };
  }

  toggleChangetariff() {
    this.setState({ toggleChangetariff: !this.state.toggleChangetariff });
  }

  saveClick() {
    if (this.props.changeTariff) {
      this.props.changeTariff(this.props.tariff);
    }
  }

  render() {
    const {
      title,
      description,
      speedText,
      currencyAndDelayText,
      toText,
      saveText,
      tariff,
      changeTariffAwaiter,
      successText,
      failText,
      fullFee,
      currentFee
    } = this.props;

    const diff = tariff.fee - currentFee;
    const descriptionText = `${
      description.description} ${
      diff > 0 ? description.increase : description.decrease} ${
      fullFee + diff} ${
      currencyAndDelayText}`;

    let content = (
      <React.Fragment>
        <div className={cx('lk-internet__row',
            style['lk-internet__row--popup-layout'],
            style['lk-internet__row--popup-layout-first'],
          )}
        >
          <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-left-common'])}>
            <Switch onChange={this.toggleChangetariff} isFuture checked />
          </div>
          <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-middle'])}>
            <div className={cx('lk-internet__sub-row')}>
              <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--first')}>
                <div className={cx('lk-internet__option-name')}>{tariff.name}</div>
              </div>
              <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--second')}>
                <span>{toText} {tariff.value} {speedText}</span>
              </div>
            </div>
          </div>
          <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-right'])}>
            <span className={cx('lk-internet__tile-cost')}>
              {toText} {tariff.fee} {currencyAndDelayText}
            </span>
          </div>
        </div>
        <div className={cx(style['lk-internet__popup-clarification'])}>
          {descriptionText}
        </div>
        <div className={cx(style['lk-internet__popup-btn-container'])}>
          <Button className={'big'} onClick={this.saveClick}>{saveText}</Button>
        </div>
      </React.Fragment>
    );

    switch (changeTariffAwaiter.status) {
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
        <h2 className={cx(style['lk-internet__popup-title--centered'])}>{title}</h2>
        {content}
      </div>);
  }
}
