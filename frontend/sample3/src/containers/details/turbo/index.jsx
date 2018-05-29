/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';

import List from 'components/list';
import {
  DataTypes,
  SortDirection,
  DETAILS_MENU_TURBO_BUTTON_ITEM_ID,
  DateFormats,
  NumFormats
} from 'consts';

import Utils from 'utils';

const mapStateToProps = state => ({
  isVisible: state.visibilityDetailsMenu === DETAILS_MENU_TURBO_BUTTON_ITEM_ID,

  items: Utils.sort(
    state.turboButtonHistory,
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
    sum: Utils.formatNum(
      x.sum,
      NumFormats.FixedHideZero),
    serviceName: x.serviceName,
    trafficUp: (() => {
      const speedUp = x.speedUp;

      if (x.trafficUp) {
        return `${x.trafficUp} Мб`;
      }

      return `${speedUp} Мбит/с`;
    })()
  })),

  css: {
    cell50: true,
    black: true
  },
  columns: [{
    alias: 'serviceName',
    title: 'Услуга',
    width: '220px'
  }, {
    alias: 'activateDate',
    title: 'Дата подключения сервиса',
    width: '180px'
  }, {
    alias: 'deactivateDate',
    title: 'Дата отключения сервиса',
    width: '140px'
  }, {
    alias: 'trafficUp',
    title: 'Добавленная скорость или трафик',
    width: '150px'
  }, {
    alias: 'price',
    title: 'Стоимость в руб.',
    width: '60px'
  }]
});

export default connect(
  mapStateToProps
)(List);
