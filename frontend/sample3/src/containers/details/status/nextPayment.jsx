/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import { connect } from 'react-redux';

import Utils from 'utils';
import { FttbAccountStatus, NumFormats } from 'consts';

const mapStateToProps = state => ({
  nextPayment: Utils.formatNum(
    ((state.info.debit || 0) + state.info.nextPayment) - state.info.balance,
    NumFormats.FixedTwoSymbols),
  status: state.info.status,
  isBalanceSufficient: !state.info.promisedPaymentSum &&
    ((((state.info.debit || 0) + state.info.nextPayment) - state.info.balance) <= 0)
});

class Info extends React.Component {
  render() {
    if (this.props.status === FttbAccountStatus.FinBlock) {
      return (<div className="row">
        <div className="lcell">Сумма к оплате</div>
        <div className="rcell"><span>{this.props.nextPayment}</span> руб.</div>
      </div>);
    }

    if (this.props.status === FttbAccountStatus.Active) {
      if (this.props.isBalanceSufficient) {
        return (<div className="row">
          <div className="lcell">Для оплаты следующего расчетного периода средств на балансе достаточно</div>
        </div>);
      }

      return (
        <div className="row">
          <div className="lcell">К оплате за следующий период</div>
          <div className="rcell"><span>{this.props.nextPayment}</span> руб.</div>
        </div>
      );
    }

    return null;
  }
}

export default connect(
    mapStateToProps
)(Info);
