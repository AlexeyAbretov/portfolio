/* eslint react/prefer-stateless-function: 0 */
import { connect } from 'react-redux';
import React from 'react';

import {
  TOP_MENU_DETAILS_ITEM_ID
} from 'consts';

import Status from './status';
import Menu from './menu';
import OperationHistory from './operations';
import PaymentHistory from './payments';
import ServicesActivity from './services';
import Discounts from './discounts';
import Internet from './internet';
import TurboActivity from './turbo';
import Calls from './calls';

import Filter from './filter';

const mapStateToProps = state => ({
  isVisible: state.visibilityTopMenu === TOP_MENU_DETAILS_ITEM_ID
});

class Details extends React.Component {
  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <div className="content-wrap">
        <h2>Финансы и детализация</h2>

        <Status />
        <Menu />

        <Filter />

        <div className="tableDetalization">
          <OperationHistory />
          <PaymentHistory />
          <ServicesActivity />
          <Discounts />
          <Internet />
          <TurboActivity />
          <Calls />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(Details);
