/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import MenuItem from './menuitem';
import styles from './style.css';

const cx = classNames.bind(styles);

export default class Menu extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.any
    })),
    click: PropTypes.func,
    active: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    items: [],
    click: () => {},
    active: null,
    className: 'sub-nav'
  }

  render() {
    const { items, click, active, className } = this.props;
    const menu = (items || []).map(x => (
      <MenuItem
        id={x.id}
        title={x.title}
        content={x.content}
        click={x.id === active ? null : click}
        isActive={x.id === active}
        key={x.id}
        css={x.css}
      />
    ));

    return (
      <ul className={cx([className])}>
        {menu}
      </ul>
    );
  }
}
