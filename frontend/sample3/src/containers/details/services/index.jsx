/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';

import List from 'components/list';
import {
  DataTypes,
  SortDirection,
  DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID,
  DateFormats,
  NumFormats
} from 'consts';

import Utils from 'utils';

const mapStateToProps = state => ({
  isVisible: state.visibilityDetailsMenu === DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID,

  items: Utils.sort(
      state.servicesHistory,
      SortDirection.Descending,
      'activateDate',
      DataTypes.DateTime)
    .map(x => ({
      id: x.id,
      activateDate: Utils.formatDate(
        x.activateDate,
        DateFormats.FullDateWithTime),
      deactivateDate: Utils.formatDate(
        x.deactivateDate,
        DateFormats.FullDateWithTime),
      price: Utils.formatNum(
        x.price,
        NumFormats.FixedHideZero),
      name: x.name
    })),

  css: {
    cell50: true,
    black: true
  },
  columns: [{
    alias: 'name',
    title: 'Услуга',
    width: '400px'
  }, {
    alias: 'activateDate',
    title: 'Дата подключения сервиса',
    width: '170px'
  }, {
    alias: 'deactivateDate',
    title: 'Дата отключения сервиса',
    width: '170px'
  }, {
    alias: 'price',
    title: 'Базовая стоимость в руб.',
    width: '125px'
  }]
});

export default connect(
  mapStateToProps
)(List);
