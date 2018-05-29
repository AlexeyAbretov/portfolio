import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import DinamicLink from 'components/dinamicLink';
import styles from '../styles.css';

const cx = classNames.bind(styles);

const Info = (props) => {
  const {
    title,
    fullFeeText,
    feeText,
    tariffText,
    channels,
    changeLinkText,
    name,
    showChangeLink,
    changeBlock,
    toggleChangeBlock,
    changeLinkStatus,
    showTariffInfo
  } = props;

  return (
    <div className={cx('lk-tv__tile')}>
      <div className={cx('lk-tv__row', 'lk-tv__row--tile-title-row')}>
        <div className={cx('lk-tv__cell', 'lk-tv__cell--wide')}>
          <h3 className={cx('lk-tv__tile-title')}>{title}</h3>
        </div>
        <div className={cx('lk-tv__cell')}>
          <div className={cx('lk-tv__tile-cost')}>{fullFeeText}</div>
        </div>
      </div>
      <div className={cx('lk-tv__row')}>
        {showTariffInfo && <div className={cx('lk-tv__cell', 'lk-tv__cell--left-common')}>
          <div className={cx('lk-tv__option-title')}>{tariffText}</div>
        </div>}
        <div className={cx('lk-tv__cell', 'lk-tv__cell--second')}>
          <div className={cx('lk-tv__sub-row')}>
            <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--first')}>
              <div className={cx('lk-tv__option-name')}>{name}</div>
            </div>
            <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--second', 'lk-tv__option-name')}>
              {/* не готов попап. выводим пока как текст */}
              {/* <DinamicLink
                showArrow
                text={channels}
                modifier="lk-tv__dynamic"
              /> */}
              {showTariffInfo && channels}
              {showChangeLink && <div className={cx('lk-tv__change-dynamic-wrap')}>
                <DinamicLink
                  showArrow
                  text={changeLinkText}
                  onClick={toggleChangeBlock}
                  opener
                  openerActive={changeLinkStatus}
                />
              </div>}
            </div>
          </div>
        </div>
        {showTariffInfo && <div className={cx('lk-tv__cell')}>
          <div className={cx('lk-tv__tile-cost')}>{feeText}</div>
        </div>}
      </div>
      {changeBlock}
    </div>
  );
};

Info.propTypes = {
  title: PropTypes.string.isRequired,
  fullFeeText: PropTypes.string,
  tariffText: PropTypes.string,
  channels: PropTypes.string,
  changeLinkText: PropTypes.string,
  name: PropTypes.string,
  showChangeLink: PropTypes.bool,
  changeLinkStatus: PropTypes.bool,
  showTariffInfo: PropTypes.bool,
  toggleChangeBlock: PropTypes.func
};

Info.defaultProps = {
  title: 'Тв',
  fullFeeText: '',
  tariffText: '',
  channels: '',
  changeLinkText: '',
  name: '',
  showChangeLink: true,
  changeLinkStatus: false,
  toggleChangeBlock: () => {},
  showTariffInfo: true
};

export default Info;
