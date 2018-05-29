import React from 'react';
import classNames from 'classnames/bind';
import style from './style.css';

const cx = classNames.bind(style);

const BannerZone = (props) => {
  const { content } = props;

  if (!content) {
    return null;
  }

  const bannersLayout = content.length;

  return (
    <div className={cx('lk-banner-zone')}>
      { bannersLayout === 2 &&
        <div className={cx('lk-banner-zone__items', 'lk-banner-zone__items--double')}>
          <div className={cx('lk-banner-zone__item')} dangerouslySetInnerHTML={{ __html: props.content[0] }} />
          <div className={cx('lk-banner-zone__item')} dangerouslySetInnerHTML={{ __html: props.content[1] }} />
        </div>
      }
      { bannersLayout === 3 &&
        <div className={cx('lk-banner-zone__items', 'lk-banner-zone__items')}>
          <div className={cx('lk-banner-zone__item')} dangerouslySetInnerHTML={{ __html: props.content[0] }} />
          <div className={cx('lk-banner-zone__item')} dangerouslySetInnerHTML={{ __html: props.content[1] }} />
          <div className={cx('lk-banner-zone__item')} dangerouslySetInnerHTML={{ __html: props.content[2] }} />
        </div>
      }
    </div>
  );
};

export default BannerZone;
