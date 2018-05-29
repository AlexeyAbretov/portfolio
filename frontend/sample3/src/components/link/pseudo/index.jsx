/* eslint jsx-a11y/no-static-element-interactions:0 */
/* eslint no-script-url:0 */
/* eslint react/no-danger: 0 */
/* eslint react/forbid-prop-types: 0 */

import PropTypes from 'prop-types';

import React from 'react';

import classNames from 'classnames/bind';

export default class PseudoLink extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    this.props.click();
  }

  render() {
    const { text, style, css } = this.props;

    const classes = classNames({
      dynamic: true,
      ...css
    });

    return (
      <span
        className={classes}
        style={style}
        onClick={this.click}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }
}

PseudoLink.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  css: PropTypes.object,
  click: PropTypes.func
};

PseudoLink.defaultProps = {
  text: '',
  style: {},
  css: {},
  click: () => {}
};
