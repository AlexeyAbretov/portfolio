/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './styles.css';
import { Arrow } from 'components/vendor-ui';

const cx = classNames.bind(style);

const DinamicLink = (props) => {
  const { text, onClick, showArrow, action, actionType, modifier, opener, openerActive, color} = props;

  return (
    <span
      className={cx('lk-dynamic-wrap', action)}
      data-filter-type-id={actionType}
      // data-id={dataId}
      onClick={onClick}>
      <span 
        className={cx('dynamic', 'lk-dynamic-link', 'lk-dynamic-link')}
        style={{color: color}}
      >
        {text}
      </span>
      {showArrow &&
        <Arrow className={cx('lk-dynamic-arrow',
          {'lk-dynamic-arrow--opener': opener},
          {'lk-dynamic-arrow--opener-active': openerActive}, modifier)}/>
      }
    </span>
  )
}

DinamicLink.defaultProps = {
  showArrow: false,
  onClick: () => { },
  text: 'Ссылка',
  modifier: '',
  openerActive: false,
  opener: false,
  color: '#282828',
};

DinamicLink.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  modifier: PropTypes.string,
  showArrow: PropTypes.bool,
  openerActive: PropTypes.bool,
  opener: PropTypes.bool,
  color: PropTypes.string,
};

export default DinamicLink;