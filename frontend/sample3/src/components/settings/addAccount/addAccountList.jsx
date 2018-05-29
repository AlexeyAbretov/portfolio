/* eslint react/prefer-stateless-function: 0 */
/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import AddAccountItem from './addAccountItem';

export default class AddAccountList extends React.Component {
  render() {
    const items = this.props.recomendedList.map((account) => {
      const item = (
        <AddAccountItem
          key={account.login}
          account={account}
          {...this.props}
        />
      );
      return item;
    });

    return (
      <div className="control-phone list-phones nomargin">
        {items}
      </div>
    );
  }
}
