import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.css';

const cx = classNames.bind(style);

const LayoutContent = ({ children }) => (
  <div className={cx('lk-tiles')}>
    {children}
  </div>
);

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
