import React from 'react';

import PseudoLink from 'components/link/pseudo';

import Utils from 'utils';

import AddAccount from './index';


export default class AddAccountItem extends React.Component {
  constructor(props) {
    super(props);

    this.OnShowAccountClick = this.OnShowAccountClick.bind(this);
    this.OnCloseAccountClick = this.OnCloseAccountClick.bind(this);

    this.state = { showLink: true };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset === true) {
      this.setState({ showLink: true });
    }
  }

  OnShowAccountClick() {
    this.setState({ showLink: false });
  }
  OnCloseAccountClick() {
    this.setState({ showLink: true });
  }

  render() {
    const ctnTitle = Utils.getLoginTitleString(this.props.account.login);

    return (
      <div>
        <div className="phone-line">
          <div className="control-phone-number">
            <span className="hide-dyn">
              <PseudoLink text={this.props.texts.hide} click={this.OnCloseAccountClick} />
            </span>
            <span className="bind-round">
              <PseudoLink text={this.props.texts.bind} click={this.OnShowAccountClick} />
            </span>
          </div>
          <div className="home-number">
            <span className="recom-number">{ctnTitle}</span>
          </div>
        </div>
        <div className="dashed-block" style={{ display: this.state.showLink ? 'none' : 'block' }}>
          <div className="ft" />
          <div className="fm">
            <AddAccount
              show={!this.state.showLink}
              onClose={this.OnCloseAccountClick}
              {...this.props}
            />
          </div>
          <div className="fb" />
        </div>
      </div>
    );
  }
}
