import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './styles.sass';

const cx = classNames.bind(styles);

const App = (props) => {
  const { title, children } = props;
  return (
    <div className={cx(styles.app)}>
      <div className={cx(styles.app__title)}>{title}</div>
      {children}
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string
};

App.defaultProps = {
  title: 'Welcome to App!!!'
};

export default App;
