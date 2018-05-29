/* eslint jsx-a11y/no-static-element-interactions:0 */
/* eslint no-script-url:0 */
/* eslint react/forbid-prop-types: 0 */

import PropTypes from 'prop-types';

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
    const { text, target, isVisible, header } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <div className="block-inform-bot">
        {header ? <span>{header}</span> : null}
        {header ? <br /> : null}
        <a href="javascript:void(0)" target={target} onClick={this.click}>{text}</a>
      </div>
    );
  }
}

Link.propTypes = {
  text: PropTypes.any,
  click: PropTypes.func,
  isVisible: PropTypes.bool
};

Link.defaultProps = {
  text: null,
  click: () => {},
  isVisible: true
};
