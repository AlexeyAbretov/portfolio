import { connect } from 'react-redux';

import { selectingDetailsMenuItem } from 'actions';

import Menu from 'components/menu';

import {
  DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,
  DETAILS_MENU_PAYMENTS_ITEM_ID,
  DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID,
  DETAILS_MENU_CALLS_ITEM_ID,
  DETAILS_MENU_TURBO_BUTTON_ITEM_ID,
  DETAILS_MENU_DISCOUNTS_ITEM_ID,
  DETAILS_MENU_INTERNET_ITEM_ID
} from 'consts';

const mapStateToProps = state => ({
  active: state.visibilityDetailsMenu,
  items: [{
    id: DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,
    title: 'История операций'
  },
  {
    id: DETAILS_MENU_PAYMENTS_ITEM_ID,
    title: 'Платежи'
  },
  {
    id: DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID,
    title: 'Активность услуг'
  },
  {
    id: DETAILS_MENU_CALLS_ITEM_ID,
    title: 'Звонки'
  },
  {
    id: DETAILS_MENU_TURBO_BUTTON_ITEM_ID,
    title: 'Турбокнопка'
  },
  {
    id: DETAILS_MENU_DISCOUNTS_ITEM_ID,
    title: 'Скидки и компенсации'
  },
  {
    id: DETAILS_MENU_INTERNET_ITEM_ID,
    title: 'Интернет-трафик'
  }]
});

const mapDispatchToProps = dispatch => ({
  click: (id) => {
    dispatch(selectingDetailsMenuItem(id));
  }
});

const DetailsMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

export default DetailsMenu
;
