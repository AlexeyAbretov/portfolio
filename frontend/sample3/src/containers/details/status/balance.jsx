/* eslint  react/prefer-stateless-function: 0 */

import React from 'react';
import { connect } from 'react-redux';

import Utils from 'utils';
import { NumFormats } from 'consts';

const mapStateToProps = state => ({
  balance: Utils.formatNum(
    state.info.balance,
    NumFormats.FixedTwoSymbols)
});

class BlockingStatus extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="lcell">Текущий баланс</div>
        <div className="rcell"><span>{this.props.balance}</span> руб.</div>
      </div>
    );
  }
}

export default connect(
    mapStateToProps
)(BlockingStatus);
