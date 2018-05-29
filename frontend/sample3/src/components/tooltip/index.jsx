import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames/bind';

const Tooltip = (props) => {
  const {
    arrowLeft,
    wrapLeft,
    wrapTop,
    width,
    minHeight,
    show,
    borderStyle,
    children,
    position,
    className
  } = props;

  return (
    <div
      // className="folded show folded-blocking"
      className={cx('folded', className)}
      style={{
        width,
        minHeight,
        display: show ? 'block' : 'none',
        borderStyle,
        position,
        left: wrapLeft,
        top: wrapTop,
      }}
    >
      <span
        className="before"
        style={{
          left: arrowLeft,
          backgroundPosition: borderStyle === 'dashed' ? '-28px -783px' : '0 -632px',
        }}
      />
      {children}
    </div>
  );
};

Tooltip.propTypes = {
  arrowLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrapLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrapTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  show: PropTypes.bool,
  position: PropTypes.string,
  borderStyle: PropTypes.string,
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  arrowLeft: 0,
  wrapLeft: 0,
  wrapTop: 'auto',
  width: 'auto',
  minHeight: 0,
  show: true,
  position: 'relative',
  borderStyle: 'solid',
  className: '',
};

export default Tooltip;
