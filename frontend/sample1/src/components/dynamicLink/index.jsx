import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Parser from 'react-html-parser';

import { Arrow } from 'components/vendor-ui';

import style from './styles.css';

const cx = classNames.bind(style);

const DynamicLink = (props) => {
  const { text, onClick, showArrow, opener, openerActive } = props;

  return (
    <span
      className={cx('lk-dynamic-wrap')}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <span
        className={cx('dynamic', 'lk-dynamic-link', 'lk-dynamic-link')}
      >
        {Parser(text)}
      </span>
      {showArrow &&
        <Arrow className={cx('lk-dynamic-arrow',
          { 'lk-dynamic-arrow--opener': opener },
          { 'lk-dynamic-arrow--opener-active': openerActive })}
        />
      }
    </span>
  );
};

DynamicLink.defaultProps = {
  showArrow: false,
  onClick: () => { },
  text: 'Ссылка',
  openerActive: false,
  opener: false
};

DynamicLink.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  showArrow: PropTypes.bool,
  openerActive: PropTypes.bool,
  opener: PropTypes.bool,
};

export default DynamicLink;
