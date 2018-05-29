/* eslint react/prefer-stateless-function: 0 */
/* eslint react/jsx-boolean-value: 0 */

import React from 'react';

import PseudoLink from 'components/link/pseudo';

import AddAccount from './index';

export default class AddNewAccountItem extends React.Component {
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
    return (
      <div className="dashed-block">
        <div className="ft" />
        <div className="fm">
          <div className="fmr" style={{ display: this.state.showLink ? 'block' : 'none' }}>
            <div className="add-link">
              <PseudoLink text={this.props.texts.linkText} click={this.OnShowAccountClick} />
            </div>
          </div>
          <AddAccount
            show={!this.state.showLink}
            onClose={this.OnCloseAccountClick}
            {...this.props}
          />
        </div>
        <div className="fb" />
      </div>
    );
  }
}
