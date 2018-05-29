/* eslint jsx-a11y/label-has-for: 0 */

import React from 'react';
import Checkbox from 'components/checkbox';


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
    this.setState({ checked: !this.state.checked });
    if (this.props.onChange) {
      this.props.onChange({ checked: !this.state.checked, value: this.props.value, event: e });
    }
  }

  render() {
    return (
      <div onClick={this.onClick} role="checkbox" aria-checked="false" tabIndex="0">
        <Checkbox checked={this.state.checked} value={this.props.value} onChange={this.onClick} />
        <label>{this.props.text}</label>
      </div>);
  }

}
