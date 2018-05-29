/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint no-script-url: 0 */

import React from 'react';
import classNames from 'classnames/bind';

import Tooltip, { TooltipPosition } from 'components/tooltip/vendor';
import WidgetLink from 'components/widgetLink';
import DinamicLink from 'components/dinamicLink';
import { WhiteBlock, Popup } from 'components/vendor-ui';
import SpeedUpPopup from 'components/internet/popups/upspeed';
import Portal from 'components/portal';
import { OperationStatus } from 'consts';

import style from './style.css';
import commonStyles from '../common-styles.css';

const cx = classNames.bind(style);

export default class Internet extends React.Component {
  constructor(props) {
    super(props);

    this.speedUpPopupClose = this.speedUpPopupClose.bind(this);
    this.state = { showPopup: false };
  }

  speedUpPopupClose() {
    this.setState({ showPopup: false });
    const speedUpAwaiter = this.props.popup.upspeed.speedUpAwaiter;
    if (this.props.resetAwaiters) {
      this.props.resetAwaiters();
    }
    if (speedUpAwaiter.status === OperationStatus.Success) {
      this.props.resetPreset();
    }
  }

  render() {
    const {
      title,
      icon,
      inSpeedText,
      outSpeedText,
      inSpeedValue,
      outSpeedValue,
      servicesText,
      servicesCount,
      note,
      addMoreServices,
      speedUpText,
      addMoreServicesText,
      servicesClick,
      popup,
      titleClick,
      speedUpClick,
      isShowVsuLink
    } = this.props;

    return (
      <WhiteBlock className={cx(commonStyles['internet-widget'])}>
        <div className={cx('internet-widget__header')}>
          <img src={icon} alt="inet_icon" className={cx('internet-widget__header-icon')} />
          <h3>
            <a href="javascript:void(0)" className={cx('internet-widget__header-link')} onClick={titleClick}>{title}</a>
          </h3>
        </div>
        <div className={cx('internet-widget__columns')}>
          <div className={cx('internet-widget__column')}>{inSpeedText}</div>
          <div className={cx('internet-widget__column')}>
            {inSpeedValue}
            <Tooltip position={TooltipPosition.right} width={200}>
              <div>{note}</div>
            </Tooltip>
          </div>
        </div>
        <div className={cx('internet-widget__columns')}>
          <div className={cx('internet-widget__column')}>{outSpeedText}</div>
          <div className={cx('internet-widget__column')}>
            {outSpeedValue}
            <Tooltip position={TooltipPosition.right} width={200}>
              <div>{note}</div>
            </Tooltip>
          </div>
        </div>
        <div className={cx('internet-widget__columns')}>
          <div className={cx('internet-widget__column')}>{servicesText}</div>
          <div className={cx('internet-widget__column')}>
            <DinamicLink
              showArrow
              text={servicesCount}
              onClick={servicesClick}
            />
          </div>
        </div>
        <div className={cx('internet-widget__links')} >
          {isShowVsuLink && <WidgetLink
            text={speedUpText}
            onClick={() => this.setState({ showPopup: true })}
            className={cx('internet-widget__link')}
          />}
          <WidgetLink text={addMoreServicesText} onClick={addMoreServices} className={cx('internet-widget__link')} />
        </div>
        <Portal>
          <Popup opened={this.state.showPopup === true} onClose={this.speedUpPopupClose}>
            <SpeedUpPopup {...popup.upspeed} saveClick={speedUpClick} />
          </Popup>
        </Portal>
      </WhiteBlock>);
  }
}
