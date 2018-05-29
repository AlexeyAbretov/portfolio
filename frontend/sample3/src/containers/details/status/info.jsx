/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import { connect } from 'react-redux';

import Utils from 'utils';
import { FttbAccountStatus, DateFormats } from 'consts';

const mapStateToProps = state => ({
  paymentDate: Utils.formatDate(state.info.paymentPeriod,
    DateFormats.DayNumberMonth),
  blockDate: Utils.formatDate(state.info.blockDate,
    DateFormats.DayNumberMonthWithTime),
  status: state.info.status
});

class Info extends React.Component {
  render() {
    if (this.props.status !== FttbAccountStatus.Active) {
      return (<h3>
        <span>{this.props.blockDate}</span> счет был заблокирован
      </h3>);
    }

    return (
      <h3>Текущий расчетный период оплачен до <span>{this.props.paymentDate}</span></h3>
    );
  }
}

export default connect(
    mapStateToProps
)(Info);
