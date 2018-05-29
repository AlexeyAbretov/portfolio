/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames/bind';

import DinamicLink from 'components/dinamicLink';

import {
  OwnerShipType,
  OwnerShipNames
} from 'consts';

import style from '../styles.css';

const cx = classNames.bind(style);

export default class Services extends React.Component {
  static getOwnerShip(type, price) {
    switch (type) {
      case OwnerShipType.Rent:
        return OwnerShipNames.Rent;
      case OwnerShipType.Buy:
        return price !== 0 ? OwnerShipNames.Installment : OwnerShipNames.Buy;
      default:
        return '';
    }
  }

  render() {
    const {
      title,
      deviceType,
      macText,
      routerSerialText,
      backRouterText,
      installmentText,
      currencyAndDelayText,
      devices,
      rubSymbol
    } = this.props;

    return (
      <div className={cx('lk-internet__tile')}>
        <div className={cx('lk-internet__row', 'lk-internet__row--tile-title-row')}>
          <div className={cx('lk-internet__cell')}>
            <h3 className={cx('lk-internet__tile-title')}>{title}</h3>
          </div>
        </div>
        {devices.map(x => (
          <div className={cx('lk-internet__row')} key={x.id}>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--left-common')}>
              <div className={cx('lk-internet__option-title')}>{deviceType}</div>
            </div>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--second')}>
              <div className={cx('lk-internet__sub-row')}>
                <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--first')}>
                  <div className={cx('lk-internet__option-name')}>{deviceType} {x.title}</div>
                  <DinamicLink
                    text={Services.getOwnerShip(x.ownerShipType, x.fee)}
                    modifier="lk-internet__dynamic"
                  />
                </div>
                <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--second')}>
                  <div className={cx('lk-internet__option-description')}>
                    <div>{macText}</div>
                    <div>{x.mac}</div>
                    <div>{routerSerialText}</div>
                    <div>{x.serial}</div>
                    <div className={cx('lk-internet__device-return-dynamic')}>
                      <DinamicLink
                        showArrow
                        text={backRouterText}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('lk-internet__cell')}>
              <div className={cx('lk-internet__tile-cost')}>
                {`${x.fee} ${x.ownerShipType === OwnerShipType.Buy && x.fee === 0 ? rubSymbol : currencyAndDelayText}`}
              </div>
              {
                x.ownerShipType === OwnerShipType.Buy && x.fee !== 0 ?
                  (<div className={cx('lk-internet__option-note')}>
                    {installmentText} {x.installmentDate}
                  </div>) : null
              }
            </div>
          </div>
        ))}
      </div>);
  }
}
