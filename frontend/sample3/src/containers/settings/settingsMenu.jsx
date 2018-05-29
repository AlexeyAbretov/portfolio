import { connect } from 'react-redux';

import Menu from 'components/menu';
import { selectingSettingsMenuItem } from 'actions';

import {
  SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID,
  SETTINGS_MENU_NOTIFICATIONS_ITEM_ID,
  SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID
} from 'consts';

const mapStateToProps = state => ({
  active: state.visibilitySettingsMenu,
  items: [{
    id: SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID,
    title: 'Управление номерами'
  },
  {
    id: SETTINGS_MENU_NOTIFICATIONS_ITEM_ID,
    title: 'Уведомления'
  },
  {
    id: SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID,
    title: 'Пароль и доступ'
  }]
});

const mapDispatchToProps = dispatch => ({
  click: (id) => {
    dispatch(selectingSettingsMenuItem(id));
  }
});

const SettingsMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

export default SettingsMenu;
