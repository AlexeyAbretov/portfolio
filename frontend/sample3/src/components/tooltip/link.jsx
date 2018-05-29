/* eslint jsx-a11y/no-static-element-interactions:0 */

import React from 'react';

import Tooltip from './index';

export default class TooltipLink extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    this.props.click();
  }

  render() {
    const { text, left, width } = this.props;
    const margin = '5px';
    const display = this.props.isOpen ? 'block' : 'none';
    const inline = 'inline';

    return (
      <div style={{ display: inline }}>
        <span
          className="dynamic black italic"
          style={{ marginRight: margin }}
          onClick={this.click}
        >
          {text}
        </span>
        <Tooltip left={left} display={display} width={width}>
          {this.props.children}
        </Tooltip>
      </div>
    );
  }
}
