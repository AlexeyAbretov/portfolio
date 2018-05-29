/* eslint react/prefer-stateless-function:0 */

import React from 'react';
import ManageIpTvConsole from './manageIpTvConsole';

export default class ManageIpTv extends React.Component {
  constructor(props) {
    super(props);

    this.OnSave = this.OnSave.bind(this);
  }

  OnSave(_console) {
    if (this.props.save) {
      this.props.save(_console);
    }
  }

  render() {
    const consoles = this.props.consoles.map(_console => (
      <ManageIpTvConsole
        key={_console.consoleId}
        console={_console}
        save={this.OnSave}
        hideAwaiter={this.props.hideAwaiter}
      />
    ));

    return (
      <div className="list-dropdown-devices" data-bind="foreach: Consoles()">
        { consoles }
      </div>
    );
  }
}
