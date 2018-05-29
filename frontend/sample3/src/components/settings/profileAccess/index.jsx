import React from 'react';

import PseudoLink from 'components/link/pseudo';

import AccountNoPassword from '../accountNoPassword';

export default class ProfileAccess extends React.Component {
  constructor(props) {
    super(props);

    this.OnClick = this.OnClick.bind(this);
    this.state = { toggle: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset === true) {
      this.setState({ toggle: false });
    }
  }

  OnClick() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    return (
      <div className="dashed-block">
        <div className="ft" />
        <div className="fm">
          <div className="fmr" style={{ display: this.state.toggle ? 'none' : '' }}>
            <div className="add-link" data-bind="click: ClickAddLink">
              <PseudoLink text={this.props.texts.title} click={this.OnClick} />
            </div>
          </div>
          <div className="fmr tv-prefix" style={{ display: this.state.toggle ? 'block' : 'none' }}>
            <AccountNoPassword
              showForm={this.state.toggle}
              {...this.props}
            />
          </div>
        </div>
        <div className="fb" />
      </div>
    );
  }
}
