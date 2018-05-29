/* eslint jsx-a11y/label-has-for: 0 */

import React from 'react';
import Radio from 'components/checkbox/radio';

export default class RadioWithLabel extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick(e) {
    if (this.props.onChange && !this.props.checked) {
      this.props.onChange({ checked: this.props.checked, value: this.props.value, event: e });
    }
  }

  onChange(e) {
    e.stopPropagation();
    this.onClick(e);
  }

  render() {
    return (
      <div onClick={this.onClick} role="radio" aria-checked="false" tabIndex="0" className={this.props.cssClass}>
        <Radio checked={this.props.checked} value={this.props.value} onChange={this.onChange} />
        <label>{this.props.text}</label>
      </div>);
  }
}
