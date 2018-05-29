/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.css';
import { Arrow } from 'components/vendor-ui';

const cx = classNames.bind(style);

const WidgetLink = (props) => {
  const { text, onClick, showArrow, action, actionType, dataId, showBorder } = props;

  return (
    <span
      className={cx({'widget-link': true, 'widget-link_border': showBorder, action})}
      data-filter-type-id={actionType}
      data-id={dataId}
      onClick={onClick}>
      <span>{text}</span>
      {showArrow &&
        <Arrow className={cx('widget-link-arrow')}/>
      }
    </span>
  )
}

WidgetLink.defaultProps = {
  showArrow: true,
  onClick: () => { },
  text: 'Ссылка',
  showBorder: true
};

WidgetLink.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  showArrow: PropTypes.bool,
  showBorder: PropTypes.bool,
};

export default WidgetLink;