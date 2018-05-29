import { connectAdvanced } from 'react-redux';

import { selectingMenuItem } from 'actions';

import Menu from 'components/menu';

import {
  TOP_MENU_PROFILE_ITEM_ID,
  TOP_MENU_DETAILS_ITEM_ID,
  TOP_MENU_INTERNET_ITEM_ID,
  TOP_MENU_TV_ITEM_ID,
  TOP_MENU_MESSAGES_ITEM_ID,
  TOP_MENU_SETTINGS_ITEM_ID,
} from 'consts';

const mapStateToProps = state => ({
  active: state.visibilityTopMenu,
  className: 'sidebar-menu',
  items: [
    {
      id: TOP_MENU_PROFILE_ITEM_ID,
      title: state.options.menu.myVendor
    },
    {
      id: TOP_MENU_INTERNET_ITEM_ID,
      title: state.options.menu.internet
    },
    {
      id: TOP_MENU_TV_ITEM_ID,
      title: state.options.menu.tv
    },
    {
      id: TOP_MENU_DETAILS_ITEM_ID,
      title: state.options.menu.details
    },
    {
      id: TOP_MENU_SETTINGS_ITEM_ID,
      title: state.options.menu.settings
    },
    {
      id: TOP_MENU_MESSAGES_ITEM_ID,
      title: state.unreadedNotificationCount ?
        `${state.options.menu.messages} (${state.unreadedNotificationCount})` :
        state.options.menu.messages
    },
  ]
});

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    click: (id) => {
      dispatch(selectingMenuItem(id));
    }
  });
}

export default connectAdvanced(selectorFactory)(Menu);
