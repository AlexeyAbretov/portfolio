import React from 'react';
import classNames from 'classnames/bind';

import VendorArrow from 'vendor-react-ui-toolkit/source/components/Arrow';

import style from './styles.css';

const cx = classNames.bind(style);

const Arrow = (props) => {
  const itemClass = cx({
    arrow: true
  });
  return (
    <div className={itemClass}>
      <VendorArrow {...props} />
    </div>
  );
};

export default Arrow;
