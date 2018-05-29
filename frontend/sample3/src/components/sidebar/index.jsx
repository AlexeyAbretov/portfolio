import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.css';

const cx = classNames.bind(style);

const Sidebar = ({ children }) => (
  <div className={cx(['lk-sidebar'])}>
    {children}
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
