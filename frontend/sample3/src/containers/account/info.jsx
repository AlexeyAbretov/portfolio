import { connect } from 'react-redux';
import UserInfo from 'components/userInfo';
import { toggleAccountsMenu, switchAccount } from 'actions';
import { UserType } from 'consts';

import {
  getCurrentAccount
} from 'selectors/accounts';

const mapStateToProps = (state) => {
  const current = getCurrentAccount(state);
  const title = current ? current.desc : '';

  return {
    menuIsVisible: state.visibilityAccountsMenu,
    ctn: current ? current.name : '',
    items: (state.accounts || []).map(x => ({
      homeAccount: x.userType === UserType.Fttb,
      mobileAccount: x.userType === UserType.Mobile,
      number: x.name,
      title: x.desc,
      account: x.account,
      isActive: x.isActive,
      items: (x.ctns || []).map(y => ({
        homeAccount: y.userType === UserType.Fttb,
        mobileAccount: y.userType === UserType.Mobile,
        number: y.name,
        title: y.desc,
        account: y.account,
        isActive: y.isActive,
      })),
    })),
    title,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => {
    dispatch(toggleAccountsMenu());
  },
  switchAccount: (id) => {
    dispatch(switchAccount(id));
    // todo: hide in component in state?
    dispatch(toggleAccountsMenu());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
