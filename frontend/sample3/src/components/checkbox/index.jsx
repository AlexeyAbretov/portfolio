import PropTypes from 'prop-types';
import React from 'react';

export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onChange(e);
  }

  render() {
    const checked = this.props.checked === true;
    let cssClass = 'checkbox';
    if (checked) {
      cssClass += ' checked';
    }
    if (this.props.disabled) {
      cssClass += ' disabled';
    }

    return (
      <span role="checkbox" aria-checked="false" onClick={this.onClick} className={cssClass} tabIndex="0">
        <input type="checkbox" checked={checked} value={this.props.value} onChange={() => null} />
      </span>);
  }

}

Checkbox.propTypes = {
  disabled: PropTypes.bool
};
Checkbox.defaultProps = {
  disabled: false
};
