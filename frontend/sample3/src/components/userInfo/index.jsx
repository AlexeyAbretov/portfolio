import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tooltip from 'components/tooltip';

import PhoneList from './phoneList';
import style from './style.css';

const cx = classNames.bind(style);

const UserInfo = (props) => {
  const {
    toggleMenu,
    menuIsVisible,
    ctn,
    title,
    items,
    switchAccount,
  } = props;

  const width = 250;

  const drop = items && items.length > 1 && <React.Fragment>
    <div
      className={cx('user-info__btn', {
        'user-info__btn--active': menuIsVisible,
      })}
      onClick={toggleMenu}
      role="button"
      tabIndex={0}
    />
    <Tooltip
      wrapLeft={-25}
      wrapTop={15.5}
      arrowLeft={'calc(50% + 1px)'}
      width={width}
      minHeight={50}
      borderStyle="solid"
      position="absolute"
      show={menuIsVisible}
      className={cx('user-info__folded')}
    >
      <PhoneList
        items={items}
        switchAccount={switchAccount}
        width={width}
      />
    </Tooltip>
  </React.Fragment>;

  return (
    <div className={cx('user-info')}>
      <div className={cx('user-info__number-wrap')}>
        <div className={cx('user-info__number')}>
          <span>{ctn}</span>
          {drop}
        </div>
      </div>
      <div className={cx('user-info__name')}>
        <span>{title}</span>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  switchAccount: PropTypes.func.isRequired,
  menuIsVisible: PropTypes.bool.isRequired,
  ctn: PropTypes.string.isRequired,
  title: PropTypes.string,
};

UserInfo.defaultProps = {
  title: '',
};

export default UserInfo;
