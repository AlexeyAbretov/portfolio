/* eslint jsx-a11y/label-has-for: 0 */

import React from 'react';
import Checkbox from '../checkbox';

export default class CheckboxWithLabel extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.state = { checked: props.checked === true };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ checked: nextProps.checked === true });
  }

  onClick(e) {
    if (this.props.disabled) {
      return;
    }
    if (this.props.onChange) {
      this.props.onChange({ checked: !this.state.checked, value: this.props.value, event: e });
    }
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div className="edit-left-col" role="checkbox" aria-checked="false" tabIndex="0">
        <Checkbox
          checked={this.state.checked}
          value={this.props.value}
          onChange={this.onClick}
          disabled={this.props.disabled}
        />
        <label className={this.props.disabled ? 'ui-state-disabled' : ''}>
          <h5 className="light-grey">{this.props.text}</h5>
        </label>
      </div>);
  }

}
