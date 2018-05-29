/* eslint jsx-a11y/no-static-element-interactions:0 */

import React from 'react';
import classNames from 'classnames/bind';
import { Button, WhiteBlock, TextInput } from 'components/vendor-ui';
import WidgetLink from 'components/widgetLink';

import PayPopup from './popups/pay';
import PromisePopup from './popups/promise';

import style from './style.css';
import commonStyles from '../common-styles.css';

const cx = classNames.bind(style);

export default class PaymentWidget extends React.Component {
  constructor(props) {
    super(props);

    this.closePopup = this.closePopup.bind(this);
    this.sumChange = this.sumChange.bind(this);

    this.state = { showPaymentPopup: false, showPromisePaymentPopup: false, valid: false, validate: true };
  }

  closePopup() {
    this.setState({ showPaymentPopup: false, showPromisePaymentPopup: false });
    if (this.props.resetAwaiters) {
      this.props.resetAwaiters();
    }
  }

  sumChange(sum) {
    const exp = new RegExp('^[0-9]*$');
    this.setState({ sum, valid: exp.test(sum) && sum, validate: exp.test(sum) && sum && sum !== '' });
  }

  pay = () => {
    const { sum } = this.state;
    const { pay } = this.props;

    pay(sum);
  }

  render() {
    const {
      title,
      icons,
      note,
      sumNote,
      rubSymbol,
      buttonText,
      promisePaymentLinkText,
      activatePromisePayment,
      paymentTypesLinkText,
      promisePaymentNote,
      hasPromisePayment,
      paymentAwaiter,
      paymentResultTexts,
      paymentPopupButtonOkText,
      paymentPopupButtonCancelText,
      paymentPopupText,
      promisePaymentAwaiter,
      promisePaymentResultTexts,
      promisePaymentPopupButtonOkText,
      promisePaymentPopupButtonCancelText,
      promisePaymentPopupText,
      allPaymentTypesClick
    } = this.props;

    const iconItems = (icons || []).map(item => (
      <img key={item} src={item} alt="icon" className={cx('payment-widget__header-icon')} />
    ));

    const paymentPopup = (<PayPopup
      closePopup={this.closePopup}
      status={paymentAwaiter.status}
      success={paymentResultTexts.success}
      fail={paymentResultTexts.fail}
      pay={() => this.pay(this.state.sum)}
      text={paymentPopupText}
      okText={paymentPopupButtonOkText}
      cancelText={paymentPopupButtonCancelText}
      isShow={this.state.showPaymentPopup}
    />);

    const promisePaymentPopup = (<PromisePopup
      closePopup={this.closePopup}
      status={promisePaymentAwaiter.status}
      success={promisePaymentResultTexts.success}
      fail={promisePaymentResultTexts.fail}
      pay={() => activatePromisePayment && activatePromisePayment()}
      text={promisePaymentPopupText}
      okText={promisePaymentPopupButtonOkText}
      cancelText={promisePaymentPopupButtonCancelText}
      isShow={this.state.showPromisePaymentPopup}
    />);

    return (
      <WhiteBlock className={cx(commonStyles['payment-widget'])}>
        {paymentPopup}
        {promisePaymentPopup}
        <div className={cx('payment-widget__header')}>
          <div className={cx('payment-widget__header-icons')}>
            {iconItems}
          </div>
          <h3>{title}</h3>
        </div>
        <div className={cx('payment-widget__subtitle')}>
          {note}
        </div>
        <div className={cx('payment-widget__columns')}>
          <div className={cx('payment-widget__column')}>
            <TextInput
              className={cx('payment-widget__input', {
                'payment-widget__input--invalid': !this.state.validate,
              })}
              onChange={this.sumChange}
            />
            <span className={cx('payment-widget__input-symbol')}>{rubSymbol}</span>
            <span className={cx('payment-widget__input-note')}>{sumNote}</span>
          </div>
          <div className={cx('payment-widget__column')}>
            <Button
              className={cx('payment-widget__btn')}
              disabled={!this.state.valid}
              onClick={() => this.setState({ showPaymentPopup: true })}
            >
              {buttonText}
            </Button>
          </div>
        </div>
        {hasPromisePayment && <div
          className={cx('payment-widget__service-note')}
          dangerouslySetInnerHTML={{ __html: promisePaymentNote }}
        />}
        <div className={cx('payment-widget__links')}>
          {!hasPromisePayment &&
            <WidgetLink
              className={cx('payment-widget__link')}
              text={promisePaymentLinkText}
              onClick={() => this.setState({ showPromisePaymentPopup: true })}
            />}
          <WidgetLink
            className={cx('payment-widget__link')}
            text={paymentTypesLinkText}
            onClick={allPaymentTypesClick}
          />
        </div>
      </WhiteBlock>
    );
  }
}
