import { connectAdvanced } from 'react-redux';

import { selectingMenuItem } from 'actions';

import Menu from 'components/menu';

import {
  TOP_MENU_PROFILE_ITEM_ID,
  TOP_MENU_DETAILS_ITEM_ID,
  TOP_MENU_MESSAGES_ITEM_ID,
  TOP_MENU_SETTINGS_ITEM_ID,
  TOP_MENU_EXIT_ITEM_ID
} from 'consts';

const mapStateToProps = state => ({
  active: state.visibilityTopMenu,
  items: [
    {
      id: TOP_MENU_PROFILE_ITEM_ID,
      title: state.options.menu.profile
    },
    {
      id: TOP_MENU_DETAILS_ITEM_ID,
      title: state.options.menu.details
    },
    {
      id: TOP_MENU_MESSAGES_ITEM_ID,
      title: state.unreadedNotificationCount ?
        `${state.options.menu.messages} (${state.unreadedNotificationCount})` :
        state.options.menu.messages
    },
    {
      id: TOP_MENU_SETTINGS_ITEM_ID,
      title: state.options.menu.settings
    },
    {
      id: TOP_MENU_EXIT_ITEM_ID,
      title: state.options.menu.exit,
      css: {
        'top-exit': true
      }
    }]
});

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    click: (id) => {
      switch (id) {
        case TOP_MENU_EXIT_ITEM_ID:
          window.location = '/logout/';
          break;
        default:
          dispatch(selectingMenuItem(id));
          break;
      }
    }
  });
}

export default connectAdvanced(selectorFactory)(Menu);
