/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint no-script-url: 0 */

import React from 'react';
import classNames from 'classnames/bind';

import WidgetLink from 'components/widgetLink';
import { WhiteBlock } from 'components/vendor-ui';
import DinamicLink from 'components/dinamicLink';

import style from './style.css';
import commonStyles from '../common-styles.css';

const cx = classNames.bind(style);

const Internet = (props) => {
  const {
    title,
    icon,
    addMoreChannelsText,
    addMoreChannels,
    addMoreEquipmentsText,
    addMoreEquipments,
    channelsText,
    channelsValue,
    subscriptionsText,
    subscriptionsValue,
    devicesText,
    devicesValue,
    channelsClick,
    titleClick
  } = props;

  return (
    <WhiteBlock className={cx(commonStyles['tv-widget'])}>
      <div className={cx('tv-widget__header')}>
        <img src={icon} alt="tv_icon" className={cx('tv-widget__icon')} />
        <h3>
          <a href="javascript:void(0)" onClick={titleClick} className={cx('tv-widget__header-link')}>{title}</a>
        </h3>
      </div>
      <table className={cx('tv-widget__table')}>
        <tbody>
          <tr>
            <td>{channelsText}</td>
            <td>
              {channelsValue && <DinamicLink
                showArrow
                text={channelsValue}
                onClick={channelsClick}
              />}
            </td>
          </tr>
          <tr>
            <td>{subscriptionsText}</td>
            <td>
              {subscriptionsValue}
            </td>
          </tr>
          <tr>
            <td>{devicesText}</td>
            <td>{devicesValue}</td>
          </tr>
        </tbody>
      </table>
      <div className={cx('tv-widget__links')}>
        <WidgetLink text={addMoreChannelsText} onClick={addMoreChannels} />
        <WidgetLink text={addMoreEquipmentsText} onClick={addMoreEquipments} />
      </div>
    </WhiteBlock>);
};

export default Internet;
