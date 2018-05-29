import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from '../styles.css';

const cx = classNames.bind(style);

const Devices = (props) => {
  const {
    title,
    items,
    isVisible
  } = props;

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cx('lk-tv__tile')}>
      <div className={cx('lk-tv__row', 'lk-tv__row--tile-title-row')}>
        <div className={cx('lk-tv__cell')}>
          <h3 className={cx('lk-tv__tile-title')}>{title}</h3>
        </div>
      </div>
      {(items || []).map(x => (
        <div className={cx('lk-tv__row')} key={x.id}>
          <div className={cx('lk-tv__cell', 'lk-tv__cell--left-common')}>
            <div className={cx('lk-tv__option-title')}>{x.title}</div>
          </div>
          <div className={cx('lk-tv__cell', 'lk-tv__cell--second')}>
            <div className={cx('lk-tv__sub-row')}>
              <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--first')}>
                <div className={cx('lk-tv__option-name')}>{x.name}</div>
              </div>
              <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--second')}>
                <div className={cx('lk-tv__option-title')}>
                  {x.macTitle}
                </div>
                <div className={cx('lk-tv__option-description')}>
                  {x.mac}
                </div>
              </div>
            </div>
          </div>
          <div className={cx('lk-tv__cell')}>
            <div className={cx('lk-tv__tile-cost')}>
              {x.feeType}
              <br />
              {x.fee}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Devices.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
};

Devices.defaultProps = {
  title: '',
  items: []
};

export default Devices;
