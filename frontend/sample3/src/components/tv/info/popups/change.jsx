/* eslint jsx-a11y/no-static-element-interactions:0 */

import React from 'react';
import classNames from 'classnames/bind';
import popupStyle from 'components/popup/styles.css';
import Portal from 'components/portal';
import { Button, Loader, Popup, Switch } from 'components/vendor-ui';
import { OperationStatus } from 'consts';
import DinamicLink from 'components/dinamicLink';
import style from '../../styles.css';

const cx = classNames.bind(style);

const ChangeTvTariffPopup = (props) => {
  const {
    status,
    success,
    fail,
    save,
    title,
    note,
    newFeeText,
    okText,
    close,
    isShow,
    tariff = {}
  } = props;

  if (!isShow) {
    return null;
  }

  const content = (() => {
    switch (status) {
      case OperationStatus.Pending:
        return (
          <div className={cx(popupStyle['lk-internet__popup-title-note--centered'])}>
            <Loader size="small" active lastIcon="clock" timeout={250}>{[]}</Loader>
          </div>
        );
      case OperationStatus.Success:
        return (
          <div>
            <h3 className={cx(popupStyle['lk-internet__popup-title-note--centered'])}>{success}</h3>
          </div>
        );
      case OperationStatus.Fail:
        return (
          <div>
            <h3 className={cx(popupStyle['lk-internet__popup-title-note--centered'])}>{fail}</h3>
          </div>
        );
      default:
        return (
          <React.Fragment>
            <div className={cx('lk-tv__row')}>
              <div className={cx('lk-tv__cell', 'lk-tv__cell--left-common')}>
                <Switch
                  checked
                  isFuture
                />
              </div>
              <div className={cx('lk-tv__cell', 'lk-tv__cell--second')}>
                <div className={cx('lk-tv__sub-row')}>
                  <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--first')}>
                    <div className={cx('lk-tv__option-name')}>
                      {tariff.title}
                    </div>
                  </div>
                  <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--second')}>
                    <DinamicLink
                      showArrow
                      text={tariff.channels}
                      modifier="lk-tv__dynamic"
                    />
                  </div>
                </div>
              </div>
              <div className={cx('lk-tv__cell')}>
                <div className={cx('lk-tv__tile-cost')}>{tariff.fee}</div>
              </div>
            </div>
            <div className={cx(popupStyle['lk-internet__popup-clarification'])}>
              {note} {newFeeText}
            </div>
            <div className={cx(popupStyle['lk-internet__popup-btn-container'])}>
              <Button className={'big'} onClick={() => save()}>{okText}</Button>
            </div>
          </React.Fragment>);
    }
  })();

  const popup = (
    <div className={cx(popupStyle['lk-internet__popup'])}>
      <h2
        className={cx(popupStyle['lk-internet__popup-title--centered'], popupStyle['lk-internet__popup-title'])}
      >
        {title}
      </h2>
      {content}
    </div>
  );

  return (
    <Portal>
      <Popup opened={isShow} onClose={close}>
        {popup}
      </Popup>
    </Portal>
  );
};

export default ChangeTvTariffPopup;
