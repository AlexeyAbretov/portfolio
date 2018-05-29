import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { Switch, Button } from 'components/vendor-ui';

import style from '../styles.css';

const cx = classNames.bind(style);

const Group = (props) => {
  const {
    title,
    items,
    saveButtonShow,
    showPopup,
    saveText,
    change
  } = props;

  return (
    <div className={cx('lk-tv__tile')}>
      <div className={cx('lk-tv__row', 'lk-tv__row--tile-title-row')}>
        <div className={cx('lk-tv__cell')}>
          {saveButtonShow &&
            <div className={cx('lk-tv__row--tile-title-btn-wrap')}>
              <Button onClick={showPopup}>{saveText}</Button>
            </div>
          }
          <h3 className={cx('lk-tv__tile-title')}>{title}</h3>
        </div>
      </div>
      {(items || []).map(x =>
        (<div key={x.id} className={cx('lk-tv__row')}>
          <div className={cx('lk-tv__cell', 'lk-tv__cell--left-common')}>
            <Switch
              id={x.id}
              defaulChecked={x.connected}
              checked={x.change}
              isFuture={x.connected !== x.change}
              onChange={() => change(x.id)}
            />
          </div>
          <div className={cx('lk-tv__cell', 'lk-tv__cell--second')}>
            <div className={cx('lk-tv__sub-row')}>
              <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--first')}>
                <div className={cx('lk-tv__option-name')}>
                  {x.title}
                </div>
              </div>
              <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--second', 'lk-tv__option-name')}>
                {/* не готов попап. выводим пока как текст */}
                {/* <DinamicLink
                    showArrow
                    text={x.channels}
                    modifier="lk-tv__dynamic"
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

Group.propTypes = {
  saveText: PropTypes.string,
  saveButtonShow: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      channels: PropTypes.string,
      feeText: PropTypes.string,
      connected: PropTypes.bool,
      change: PropTypes.bool
    })
  ),
  title: PropTypes.string,
  change: PropTypes.func,
  showPopup: PropTypes.func
};

Group.defaultProps = {
  title: 'Пакеты',
  saveText: 'Сохранить',
  items: [],
  saveButtonShow: false,
  change: () => {},
  showPopup: () => {}
};

export default Group;
