import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames/bind';
import Parser from 'react-html-parser';

import styles from './styles.css';

const cx = classNames.bind(styles);

const Status = {
  Connected: 'Connected',
  Allow: 'Allow',
  Default: 'Default'
};

export default class PseudoLink extends React.PureComponent {
  click = () => {
    this.props.click();
  }

  render() {
    let { text } = this.props;
    const { status, className } = this.props;

    if (!text) {
      text = this.props.children;
    }

    const classes = cx({
      dynamic: true,
      link__black: status === Status.Default || !status,
      link__connected: status === Status.Connected,
      link__allow: status === Status.Allow
    });

    return (
      <span
        className={cx(classes, className)}
        onClick={this.click}
        role="link"
        tabIndex="-1"
      >{Parser(text)}</span>
    );
  }
}

PseudoLink.propTypes = {
  text: PropTypes.string,
  click: PropTypes.func,
  status: PropTypes.string,
  className: PropTypes.string,
};

PseudoLink.defaultProps = {
  text: '',
  click: () => {},
  status: Status.Default,
  className: '',
};
