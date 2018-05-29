/* eslint react/prefer-stateless-function: 0 */

import { connect } from 'react-redux';
import React from 'react';

import List from 'components/list';
import {
  DataTypes,
  SortDirection,
  DETAILS_MENU_CALLS_ITEM_ID,
  DateFormats,
  NumFormats,
  CallTypeNames,
  CallType
} from 'consts';

import Utils from 'utils';

const mapStateToProps = state => ({
  isVisible: state.visibilityDetailsMenu === DETAILS_MENU_CALLS_ITEM_ID,

  items: Utils.sort(
    state.callsHistory
      .map(x => ({
        id: x.id,
        date: Utils.formatDate(
          Utils.addSeconds(x.dateTimeCallEnd, -x.duration),
          DateFormats.FullDateWithTime),
        type: CallTypeNames[x.type || CallType.None],
        comment: `${x.callDirection}/${x.comment}`,
        number: x.number,
        cost: Utils.formatNum(
          x.cost,
          NumFormats.FixedHideZero),
        duration: x.duration
      })),
    SortDirection.Descending,
    'date',
    DataTypes.DateTime),

  css: {
    grid: true,
    black: true,
    cell50: true
  },
  columns: [{
    alias: 'date',
    title: (<span>Время начала<br />вызова</span>),
    width: '200px'
  }, {
    alias: 'number',
    title: 'Номер',
    width: '140px'
  }, {
    alias: 'comment',
    title: (<span>Направление/<br />Комментарий</span>),
    width: '170px'
  }, {
    alias: 'type',
    title: 'Тип звонка',
    width: '140px'
  }, {
    alias: 'duration',
    title: 'Длительность',
    width: '100px'
  }, {
    alias: 'cost',
    title: (<span>Стоимость<br />в руб</span>),
    width: '80px'
  }]
});

export default connect(
  mapStateToProps
)(List);
