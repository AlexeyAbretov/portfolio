/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint react/no-danger: 0 */

import React from 'react';
import Utils from '../../../utils';

export default class AccountItems extends React.Component {
  constructor(props) {
    super(props);

    this.CancelAccessClick = this.CancelAccessClick.bind(this);
  }

  CancelAccessClick(linkedLogin) {
    const { text, ok, cancel } = { ...this.props.texts.confirmPopup };
    Utils.confirmPopup(text.replace('{ctn}', Utils.getLoginTitleString(linkedLogin)), ok, cancel,
      () => {
        if (this.props.cancelAccess) {
          this.props.cancelAccess(linkedLogin);
        }
      });
  }

  render() {
    const items = this.props.items.map(x =>
      (<div key={x.name} className="phone-line" data-bind="visible: IsVisible()">
        <div className="control-phone-number">
          <span className="reject-round" onClick={() => this.CancelAccessClick(x.name)}>
            <span className="dynamic">{this.props.texts.rejectAccess}</span>
          </span>
        </div>
        <div className="phone-number">
          <span className="phone">{Utils.getLoginTitleString(x.name)}</span>
        </div>
      </div>)
    );

    return (
      <div className="control-phone">
        {items}
      </div>
    );
  }
}
