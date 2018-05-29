import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const MenuLine = (props) => {
  const cx = classNames.bind(
    styles);
  const css = cx([styles.top_navigation_menu, 'top-navigation-menu']);

  return (
    <div className={css}>
      {props.children}
    </div>
  );
};

export default MenuLine;
