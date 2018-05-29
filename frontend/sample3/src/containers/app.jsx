import React from 'react';
import { connect } from 'react-redux';

import {
  TOP_MENU_PROFILE_ITEM_ID,
  TOP_MENU_INTERNET_ITEM_ID,
  TOP_MENU_TV_ITEM_ID
} from 'consts';

import AppComponent from 'components/forms';
import MenuLine from 'components/forms/menu-line';
import Menu from './menu/top';

import Details from './details';
import Messages from './messages';
import Settings from './settings';
import AccountSelector from './account/selector';
import MainPage from './main';

const App = (props) => {
  if (props.isShowContract) {
    return <MainPage />;
  }

  return (<AppComponent>
    <MenuLine>
      <AccountSelector />
      <Menu />
    </MenuLine>
    <div>
      <Details />
      <Messages />
      <Settings />
    </div>
  </AppComponent>);
};

const mapStateToProps = state => ({
  isShowContract: state.visibilityTopMenu === TOP_MENU_PROFILE_ITEM_ID ||
    state.visibilityTopMenu === TOP_MENU_INTERNET_ITEM_ID ||
    state.visibilityTopMenu === TOP_MENU_TV_ITEM_ID ||
    !state.visibilityTopMenu
});

export default connect(
  mapStateToProps
)(App);
