import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const AppComponent = (props) => {
  const cx = classNames.bind(
    styles);
  const css = cx([styles.vendor_unified_profile, 'vendor-unified-profile']);

  return (
    <div className={css}>
      {props.children}
    </div>
  );
};

export default AppComponent;
