/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames/bind';

import DinamicLink from 'components/dinamicLink';
import { Switch, Popup } from 'components/vendor-ui';

import { ServiceTypes, OperationStatus } from 'consts';

import AddservicePopup from '../popups/addservice';
import style from '../styles.css';

const cx = classNames.bind(style);

export default class Services extends React.Component {
  constructor(props) {
    super(props);

    this.toggleService = this.toggleService.bind(this);
    this.closePopup = this.closePopup.bind(this);

    this.state = { showPopup: false };
  }

  closePopup() {
    this.setState({ showPopup: false });
    const addServiceAwaiter = this.props.popup.addservice.addServiceAwaiter;
    if (this.props.resetAwaiters) {
      this.props.resetAwaiters();
    }
    if (addServiceAwaiter.status === OperationStatus.Success) {
      this.props.resetPreset();
    }
  }

  toggleService(e, service) {
    // if (e && e.target && e.target.checked) {
    if (e && e.target) {
      this.setState({ service, showPopup: true });
    } else {
      this.setState({ service: null });
    }
  }

  render() {
    const {
      title,
      currencyAndDelayText,
      services,
      connectService
    } = this.props;

    return (
      <div className={cx('lk-internet__tile')}>
        <div className={cx('lk-internet__row', 'lk-internet__row--tile-title-row')}>
          <div className={cx('lk-internet__cell')}>
            <h3 className={cx('lk-internet__tile-title')}>{title}</h3>
          </div>
        </div>
        {services.map(x => (
          <div key={x.id} className={cx('lk-internet__row')}>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--left-common')}>
              <Switch onChange={e => this.toggleService(e, x)} checked={x.connected} />
            </div>
            <div className={cx('lk-internet__cell', 'lk-internet__cell--second')}>
              <div className={cx('lk-internet__sub-row')}>
                <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--first')}>
                  <div className={cx('lk-internet__option-name')}>
                    <DinamicLink
                      text={x.title}
                      modifier=""
                    />
                  </div>
                </div>
                <div className={cx('lk-internet__sub-cell', 'lk-internet__sub-cell--second')}>
                  <div className={cx('lk-internet__option-description')}>{x.benefit}</div>
                  {x.type === ServiceTypes.Kasper ?
                    <p>
                      <DinamicLink
                        showArrow
                        text="link"
                        modifier="lk-internet__dynamic"
                      />
                    </p> : null
                  }
                </div>
              </div>
            </div>
            <div className={cx('lk-internet__cell')}>
              <div className={cx('lk-internet__tile-cost')}>{x.fee} {currencyAndDelayText}</div>
            </div>
          </div>
        ))}
        <Popup opened={this.state.showPopup} onClose={this.closePopup}>
          <AddservicePopup
            {...this.props.popup.addservice}
            service={this.state.service}
            currencyAndDelayText={currencyAndDelayText}
            connectService={connectService}
          />
        </Popup>
      </div>
    );
  }
}
