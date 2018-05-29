import React from 'react';

import { WhiteBlock } from 'components/vendor-ui';

import classNames from 'classnames/bind';
import WidgetLink from 'components/widgetLink';
import Tooltip, { TooltipPosition } from 'components/tooltip/vendor';

import style from './style.css';
import commonStyles from '../common-styles.css';

const cx = classNames.bind(style);

const AccountWidget = (props) => {
  const {
    title,
    balanceText,
    balanceValue,
    rubSymbol,
    perMonthText,
    feeText,
    feeValue,
    paymentText,
    paymentValue,
    paymentDateText,
    paymentDateValue,
    statusText,
    statusValue,
    tariffText,
    tariffClick,
    blockNumberText,
    blockClick,
    blocked,
    icon
  } = props;

  const row = (text, val, symbol = rubSymbol, toollTip = null) => (
    <tr>
      <td>{text}</td>
      <td>{val} {symbol} {toollTip}</td>
    </tr>
  );

  return (
    <WhiteBlock className={cx({
      'account-widget--active': !blocked,
      'account-widget--blocked': blocked,
    }, commonStyles['account-widget'])}
    >
      <div className={cx('account-widget__header')}>
        <img src={icon} alt="account_icon" className={cx('account-widget__header-icon')} />
        <h3>{title}</h3>
      </div>
      <table className={cx('account-widget__table')}>
        <tbody>
          {row(balanceText, balanceValue, rubSymbol,
            <Tooltip position={TooltipPosition.center} width={250}>
              <div>
                Text
              </div>
            </Tooltip>)}
          {row(feeText, feeValue, `${rubSymbol} ${perMonthText}`,
            <Tooltip position={TooltipPosition.right} width={250}>
              <div>
                Text
              </div>
            </Tooltip>)}
          {row(paymentText, paymentValue, rubSymbol)}
          {row(paymentDateText, paymentDateValue, '')}
          <tr>
            <td>{statusText}</td>
            <td>
              <span className={cx('account-widget__status', {
                'account-widget__status--active': !blocked,
                'account-widget__status--blocked': blocked,
              })}
              >
                {statusValue}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <WidgetLink
        text={tariffText}
        onClick={tariffClick}
      />
      {blocked ? (
        <div className={cx('account-widget__block-info')}>
          <span className={cx('account-widget__block-message')}>
            Этот номер заблокирован
          </span>
        </div>
      ) : (<WidgetLink
        text={blockNumberText}
        onClick={blockClick}
      />)}
    </WhiteBlock>
  );
};

export default AccountWidget;
