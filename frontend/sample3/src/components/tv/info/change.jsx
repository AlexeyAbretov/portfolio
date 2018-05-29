import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { Switch } from 'components/vendor-ui';

import style from '../styles.css';

const cx = classNames.bind(style);

const TvChange = (props) => {
  const {
    show,
    items,
    change
  } = props;

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      {(items || []).map(x => (
        <div key={x.id} className={cx('lk-tv__row')}>
          <div className={cx('lk-tv__cell', 'lk-tv__cell--left-common')}>
            <Switch onChange={() => change(x.id)} checked={false} />
          </div>
          <div className={cx('lk-tv__cell', 'lk-tv__cell--second')}>
            <div className={cx('lk-tv__sub-row')}>
              <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--first')}>
                <div className={cx('lk-tv__option-name')}>{x.title}</div>
              </div>
              <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--second', 'lk-tv__option-name')}>
                {/* не готов попап. выводим пока как текст */}
                {/* <DinamicLink
                  showArrow
                  text={x.channels}
                  modifier="lk-tv__device-return-dynamic"
                /> */}
                {x.channels}
              </div>
            </div>
          </div>
          <div className={cx('lk-tv__cell')}>
            <div className={cx('lk-tv__tile-cost')}>{x.feeText}</div>
          </div>
        </div>
    ))}
    </div>
  );
};

TvChange.propTypes = {
  show: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feeText: PropTypes.string,
    channels: PropTypes.string,
    fee: PropTypes.number
  })),
  change: PropTypes.func
};

TvChange.defaultProps = {
  items: [],
  show: false,
  change: () => {}
};

export default TvChange;
