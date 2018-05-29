/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames/bind';

import DinamicLink from 'components/dinamicLink';
import { Switch, Popup } from 'components/vendor-ui';
import { OperationStatus } from 'consts';
import ChangeTariffPopup from '../popups/changetariff';
import style from '../styles.css';

const cx = classNames.bind(style);

export default class Tariffs extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTariff = this.toggleTariff.bind(this);
    this.closePopup = this.closePopup.bind(this);

    this.state = { showPopup: false };
  }

  closePopup() {
    this.setState({ showPopup: false });
    const changeTariffAwaiter = this.props.popup.changetariff.changeTariffAwaiter;
    if (this.props.resetAwaiters) {
      this.props.resetAwaiters();
    }
    if (changeTariffAwaiter.status === OperationStatus.Success) {
      this.props.resetPreset();
    }
  }

  toggleTariff(e, tariff) {
    if (e && e.target && e.target.checked) {
      this.setState({ tariff, showPopup: true });
    } else {
      this.setState({ tariff: null });
    }
  }

  render() {
    const {
      toText,
      currencyAndDelayText,
      speedText,
      tariffs,
      show,
      changeTariff
    } = this.props;

    if (show !== true) {
      return null;
    }

    return (
      <div>
        {tariffs.map(x => (
          <div key={x.id} className={cx('lk-internet__row')}>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--left-common')}>
              <Switch onChange={e => this.toggleTariff(e, x)} checked={x.connected === true} />
            </div>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--second')}>
              <div className={cx('lk-internet__sub-row')}>
                <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--first')}>
                  <div className={cx('lk-internet__option-name')}>{x.title}</div>
                </div>
                <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--second')}>
                  <DinamicLink
                    showArrow
                    text={`${toText} ${x.value} ${speedText}`}
                    modifier="lk-internet__device-return-dynamic"
                  />
                </div>
              </div>
            </div>
            <div className={cx('lk-internet__cell')}>
              <div className={cx('lk-internet__tile-cost')}>{x.fee} {currencyAndDelayText}</div>
            </div>
          </div>
        ))}
        <Popup opened={this.state.showPopup} onClose={this.closePopup}>
          <ChangeTariffPopup
            {...this.props.popup.changetariff}
            tariff={this.state.tariff}
            toText={toText}
            currencyAndDelayText={currencyAndDelayText}
            changeTariff={changeTariff}
          />
        </Popup>
      </div>);
  }
}
