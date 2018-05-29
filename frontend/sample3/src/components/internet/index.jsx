/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames/bind';

import DinamicLink from 'components/dinamicLink';
import { Button, Popup } from 'components/vendor-ui';
import { OperationStatus } from 'consts';
import Tariffs from './tariffs';
import UpspeedPopup from './popups/upspeed';

import style from './styles.css';

const cx = classNames.bind(style);

export default class Internet extends React.Component {
  constructor(props) {
    super(props);

    this.changeTariffClick = this.changeTariffClick.bind(this);
    this.speedUpPopupClick = this.speedUpPopupClick.bind(this);
    this.speedUpPopupClose = this.speedUpPopupClose.bind(this);
    this.state = { showTariff: false, showPopup: false };
  }

  speedUpPopupClick() {
    this.setState({ showPopup: true });
  }

  speedUpPopupClose() {
    this.setState({ showPopup: false });
    const speedUpAwaiter = this.props.popup.upspeed.speedUpAwaiter;
    if (this.props.resetAwaiters) {
      this.props.resetAwaiters();
    }
    if (speedUpAwaiter.status === OperationStatus.Success) {
      this.props.resetPreset();
    }
  }

  changeTariffClick() {
    this.setState({ showTariff: !this.state.showTariff });
  }

  render() {
    const {
      title,
      fullFeeText,
      tariffText,
      name,
      // benefit,
      feeText,
      // icon,
      speedInText,
      upSpeedText,
      changeTariffText,
      isShowChangeTariffLink,
      isShowVsuButton,
      speedUpClick
    } = this.props;

    const upspeedEnable = this.props.popup.upspeed.vsuServices.length > 0;

    return (
      <div className={cx('lk-internet')}>
        <div className={cx('lk-internet__tile')}>
          <div className={cx('lk-internet__row', 'lk-internet__row--tile-title-row')}>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--wide')}>
              <h3 className={cx('lk-internet__tile-title')}>{title}</h3>
            </div>
            <div className={cx('lk-internet__cell')}>
              <div className={cx('lk-internet__tile-cost')}>{fullFeeText}</div>
            </div>
          </div>
          <div className={cx('lk-internet__row')}>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--left-common')}>
              <div className={cx('lk-internet__option-title')}>{tariffText}</div>
            </div>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--second')}>
              <div className={cx('lk-internet__sub-row')}>
                <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--first')}>
                  <div className={cx('lk-internet__option-name')}>{name}</div>
                </div>
                <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--second')}>
                  <div className={cx('lk-internet__dynamic-wrap')}>
                    <DinamicLink
                      showArrow
                      text={speedInText}
                      modifier="lk-internet__dynamic"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('lk-internet__cell')}>
              <div className={cx('lk-internet__tile-cost')}>{feeText}</div>
            </div>
          </div>
          {(isShowVsuButton || isShowChangeTariffLink) &&
            <div className={cx('lk-internet__row', 'lk-internet__row--adaptive-layout-block')}>
              {isShowVsuButton && <div
                className={cx('lk-internet__cell',
                'lk-internet__cell--left-padded',
                'lk-internet__row--adaptive-layout-block'
              )}
              >
                <div className={cx('lk-internet__sub-button', 'lk-internet__sub-button')}>
                  <Button
                    className={cx('light')}
                    onClick={this.speedUpPopupClick}
                    disabled={!upspeedEnable}
                  >
                    {upSpeedText}
                  </Button>
                </div>
              </div>}
              {isShowChangeTariffLink &&
              <div className={cx('lk-internet__cell', 'lk-internet__row--adaptive-layout-block')}>
                <div className={cx('lk-internet__dynamic-wrap')}>
                  <DinamicLink
                    showArrow
                    text={changeTariffText}
                    onClick={this.changeTariffClick}
                    opener
                    openerActive={this.state.showTariff}
                  />
                </div>
              </div>}
            </div>}
          <Tariffs {...this.props} show={this.state.showTariff} />
        </div>
        <Popup opened={this.state.showPopup} onClose={this.speedUpPopupClose}>
          <UpspeedPopup
            {...this.props.popup.upspeed}
            saveClick={speedUpClick}
          />
        </Popup>
      </div>);
  }
}

