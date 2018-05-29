import React from 'react';

export default class Radio extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { checked: props.checked };
  }

  onClick(e) {
    if (!this.state.checked && this.props.checked) {
      this.props.onChange(e);
    }
    this.setState({ checked: this.props.checked });
  }

  render() {
    const checked = this.props.checked === true;
    let cssClass = 'radio';
    if (checked) {
      cssClass += ' checked';
    }

    return (
      <span role="radio" aria-checked="false" onClick={this.onClick} className={cssClass} tabIndex="0">
        <input type="radio" checked={checked} value={this.props.value} />
      </span>);
  }
}
