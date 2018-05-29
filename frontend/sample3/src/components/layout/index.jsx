import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.css';

const cx = classNames.bind(style);

const Layout = ({ children }) => (
  <div className={cx(['lk-page-wrap'])}>
    <div className={cx(['lk-page'])}>
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
