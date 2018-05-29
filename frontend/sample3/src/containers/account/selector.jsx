/* eslint no-script-url: 0 */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Dropdown from 'components/dropdown';

import { UserType } from 'consts';
import { switchAccount } from 'actions';

import {
  getCurrentAccount
} from 'selectors/accounts';

// todo: HierarchyType, не предоставли пользователей
const mapStateToProps = (state) => {
  const current = getCurrentAccount(state);

  const contentToolboxCss = classNames({
    'dropdown-text-box': true,
    mtop10: true,
    convergent: !!(state.accounts.length === 1 &&
      state.accounts[0].userType === UserType.Convergent)
  });

  return {
    current,
    zIndex: 55,
    css: {
      'home-account': current.userType === UserType.Fttb,
      'mobile-account': current.userType === UserType.Mobile
    },
    items: (state.accounts || []).map(x => ({
      css: {
        'home-account': x.userType === UserType.Fttb,
        'mobile-account': x.userType === UserType.Mobile
      },
      name: x.name,
      desc: x.desc,
      account: x.account,
      items: (x.ctns || []).map(y => ({
        css: {
          'home-account': y.userType === UserType.Fttb,
          'mobile-account': y.userType === UserType.Mobile
        },
        name: y.name,
        desc: y.desc,
        account: y.account
      })),
    })),
    contentToolbox: (state.accounts.length === 1 ?
      <div className={contentToolboxCss}>
        <p>Добавьте номера и договоры мобильного и домашнего { '"Билайна"' }
        ваших родных и близких и контролируйте их расходы, управляйте услугами и тарифами,
        не выходя из своего личного кабинета.</p>
      </div> : null),
    toolbox: (<div className="dropdown-text-box dropdown-sub">
      <a href="javascript:void(0)" className="dropdown-add-link" style={{ opacity: 1 }}>Добавить номер</a>
    </div>),
    id: 'AccountSelector'
  };
};

const mapDispatchToProps = dispatch => ({
  change: (selected) => {
    dispatch(switchAccount(selected.account));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);
