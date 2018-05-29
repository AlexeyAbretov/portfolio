/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';

import List from 'components/list';
import {
  DataTypes,
  SortDirection,
  DETAILS_MENU_PAYMENTS_ITEM_ID,
  DateFormats,
  NumFormats,
  PaymentStatus
} from 'consts';

import Utils from 'utils';

const mapStateToProps = state => ({
  isVisible: state.visibilityDetailsMenu === DETAILS_MENU_PAYMENTS_ITEM_ID,

  items: Utils.sort(
    state.paymentHistory,
    SortDirection.Descending,
    'date',
    DataTypes.DateTime)
  .map(x => ({
    id: x.id,
    date: Utils.formatDate(
        x.date,
        DateFormats.FullDateWithTime),
    type: x.type,
    location: !x.location ? '-' : x.location,
    sum: Utils.formatNum(
      x.sum,
      NumFormats.FixedHideZero),
    status: (() => {
      if (x.status === PaymentStatus.Accept) {
        return <span>принят</span>;
      }

      return x.status;
    })()
  })),

  css: {
    grid: true,
    black: true
  },
  columns: [{
    alias: 'date',
    title: 'Дата платежа',
    width: '180px'
  }, {
    alias: 'type',
    title: 'Тип платежа',
    width: '210px'
  }, {
    alias: 'location',
    title: 'Точка оплаты',
    width: '250px'
  }, {
    alias: 'sum',
    title: 'Зачислено на счет, руб.',
    width: '100px'
  }, {
    alias: 'status',
    title: 'Статус',
    width: '100px'
  }]
});

export default connect(
  mapStateToProps
)(List);
