import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'react-html-parser';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

const App = (props) => {
  const { title, infoText, note } = props;
  return (
    <div className={cx('vendor-shpd-home-catalog')}>
      <div className={cx('vendor-shpd-home-catalog__wrap')}>
        <h1 className={cx('vendor-shpd-home-catalog__title')}>{Parser(title)}</h1>
        <div className={cx('vendor-shpd-home-catalog__benefit')}>{Parser(infoText)}</div>
        {note && <div className={cx('vendor-shpd-home-catalog__note')}>{Parser(note)}</div>}
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
  infoText: PropTypes.string,
  note: PropTypes.string
};

App.defaultProps = {
  title: '',
  infoText: '',
  note: ''
};

export default App;
