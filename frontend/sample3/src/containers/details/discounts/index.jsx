/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';

import List from 'components/list';
import {
  DataTypes,
  SortDirection,
  DateFormats,
  NumFormats,
  DETAILS_MENU_DISCOUNTS_ITEM_ID
} from 'consts';

import Utils from 'utils';

const mapStateToProps = state => ({
  isVisible: state.visibilityDetailsMenu === DETAILS_MENU_DISCOUNTS_ITEM_ID,
  items: Utils
    .sort(
      state.discountsHistory,
      SortDirection.Descending,
      'date',
      DataTypes.DateTime)
    .map(x => ({
      id: x.id,
      date: Utils.formatDate(
          x.date,
          DateFormats.FullDateWithTime),
      comment: x.comment,
      problemId: x.problemId,
      sum: Utils.formatNum(
        x.sum,
        NumFormats.FixedHideZero)
    })),
  css: {
    black: true
  },
  columns: [{
    alias: 'date',
    title: 'Дата и время',
    width: '180px'
  }, {
    alias: 'comment',
    title: 'Комментарий',
    width: '320px'
  }, {
    alias: 'problemId',
    title: 'Номер заявки',
    width: '80px'
  }, {
    alias: 'sum',
    title: 'Сумма в руб.',
    width: '80px'
  }]
});

export default connect(
  mapStateToProps
)(List);
