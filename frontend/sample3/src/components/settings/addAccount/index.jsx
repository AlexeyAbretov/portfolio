/* eslint jsx-a11y/label-has-for: 0 */

import React from 'react';

import PseudoLink from 'components/link/pseudo';

import KnownPassword from './knownPassword';
import UnknownPassword from './unknownPassword';

export default class AddAccount extends React.Component {
  constructor(props) {
    super(props);

    this.OnCloseClick = this.OnCloseClick.bind(this);
    this.OnKnownPasswordSelect = this.OnKnownPasswordSelect.bind(this);
    this.OnUnknownPasswordSelect = this.OnUnknownPasswordSelect.bind(this);
    this.OnRejectRequest = this.OnRejectRequest.bind(this);

    this.state = { isKnownPassword: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset === true) {
      this.setState({ isKnownPassword: null });
    }
  }

  OnCloseClick() {
    this.setState({ isKnownPassword: null });
    this.props.onClose();
  }
  OnKnownPasswordSelect() {
    const isKnownPassword = true;
    this.setState({ isKnownPassword });
  }
  OnUnknownPasswordSelect() {
    const isKnownPassword = false;
    this.setState({ isKnownPassword });
  }
  OnRejectRequest() {
    this.setState({ isKnownPassword: null });
  }

  render() {
    if (this.props.show !== true) {
      return null;
    }

    return (
      <div className="fmr tv-prefix">
        <div className="top-tv-prefix">
          <label>
            <h3>{this.props.texts.title}</h3>
          </label>
          <PseudoLink text={this.props.texts.reject} click={this.OnCloseClick} />
        </div>
        <ul className="radio-list">
          <KnownPassword
            onSelect={this.OnKnownPasswordSelect}
            showForm={this.state.isKnownPassword === true}
            onRejectRequest={this.OnRejectRequest}
            {...this.props}
          />
          <UnknownPassword
            onSelect={this.OnUnknownPasswordSelect}
            showForm={this.state.isKnownPassword === false}
            onRejectRequest={this.OnRejectRequest}
            {...this.props}
          />
        </ul>
      </div>
    );
  }
}
