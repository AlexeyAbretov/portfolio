import React from 'react';
import RadioWithLabel from '../radioWithLabel';
import AccountNoPassword from '../accountNoPassword';

export default class UnknownPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAccept: false,
      canPressAccept: !this.props.canEditNumber,
      ctn: this.props.ctn
    };
  }

  render() {
    const texts = this.props.texts.unknownPassword;
    return (
      <li className="option-prefix foldable">
        <RadioWithLabel
          text={texts.title}
          value="2"
          cssClass="top-option-prefix check-prefix"
          checked={this.props.showForm}
          onChange={this.props.onSelect}
        />
        <AccountNoPassword {...this.props} />
      </li>
    );
  }
}
