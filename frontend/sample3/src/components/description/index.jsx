/* eslint jsx-a11y/no-static-element-interactions:0 */

import React from 'react';

export default class Description extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    this.props.click();
  }

  render() {
    const { left, width } = this.props;
    const display = this.props.isOpen ? 'block' : 'none';
    const inline = 'inline';

    return (
      <div style={{ display: inline }}>
        <span className="dynamic-link" onClick={this.click} />
        <div
          style={{ width, display }}
          className="folded folded-tooltip"
        >
          <span className="before" style={{ left }} />
          {this.props.children}
        </div>
      </div>
    );
  }
}
