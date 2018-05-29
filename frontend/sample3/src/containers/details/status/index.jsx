/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { FttbAccountStatus } from 'consts';

import Info from './info';
import Balance from './balance';
import NextPayment from './nextPayment';

const mapStateToProps = state => ({
  css: classNames({
    'status-detalization': true,
    error: state.info.status !== FttbAccountStatus.Active
  })
});

class Status extends React.Component {
  render() {
    return (
      <div className={this.props.css}>
        <Info />

        <div className="table-detalization">
          <Balance />
          <NextPayment />
        </div>
      </div>
    );
  }
}

export default connect(
    mapStateToProps
)(Status);
