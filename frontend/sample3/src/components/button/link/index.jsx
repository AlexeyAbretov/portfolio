/* eslint jsx-a11y/no-static-element-interactions:0 */
/* eslint no-script-url:0 */

import React from 'react';

export default class Link extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    this.props.click();
  }

  render() {
    const { text } = this.props;

    return (
      <div className="bt-link">
        <span className="btn-link" onClick={this.click}>{text}</span>
      </div>
    );
  }
}
