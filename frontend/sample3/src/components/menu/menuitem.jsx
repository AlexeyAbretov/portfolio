import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.css';

const cx = classNames.bind(style);

export default class MenuItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.node,
    isActive: PropTypes.bool
  }

  static defaultProps = {
    id: null,
    title: null,
    content: null,
    isActive: false
  }

  handleClick = () => {
    this.props.click(this.props.id);
  }

  render() {
    const { title, isActive, content, css } = this.props;
    const itemClass = cx({
      active: isActive,
      ...css
    });

    return (
      <li className={itemClass}>
        <div role="button" tabIndex={0} onClick={this.handleClick}>
          {content ||
            /* eslint-disable no-script-url */
            <a href="javascript:void(0)">
              {title}
            </a>
          }
        </div>
      </li>
    );
  }
}
