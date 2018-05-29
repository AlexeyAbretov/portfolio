import React from 'react';
import classNames from 'classnames/bind';

import { WhiteBlock } from 'components/vendor-ui';

import WidgetLink from 'components/widgetLink';
import ApproveLink from 'components/link/pseudo';

import style from './style.css';
import commonStyles from '../common-styles.css';

const cx = classNames.bind(style);

const AddressWidget = (props) => {
  const {
    title,
    address,
    changeLinkText,
    moveNote,
    showMoveInfo,
    approve,
    cancel,
    approveLinkText,
    cancelLinkText,
    showRelocationDialog,
    RelocationWidget,
    needReloadPage,
    reload
  } = props;

  if (needReloadPage === true) {
    reload();
  }

  return (
    <WhiteBlock className={cx(commonStyles['address-widget'])}>
      <RelocationWidget />
      <h3 className={cx('address-widget__header')}>{title}</h3>
      <div className={cx('address-widget__address')}>{address}</div>
      {showMoveInfo &&
        <div className={cx('address-widget__move-info')}>
          <div
            className={cx('address-widget__move-cnt')}
            dangerouslySetInnerHTML={{ __html: moveNote }}
          />
          <ApproveLink text={approveLinkText} click={approve} />
        </div>
      }
      {
        showMoveInfo ? (
          <WidgetLink
            action="action-open-feedback"
            actionType="Movement"
            dataId="help"
            text={cancelLinkText}
            onClick={cancel}
          />
        ) : (
          <WidgetLink
            action="action-open-feedback"
            actionType="Movement"
            dataId="help"
            text={changeLinkText}
            onClick={showRelocationDialog}
          />
        )
      }
    </WhiteBlock>
  );
};

export default AddressWidget;
