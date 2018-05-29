/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { connect } from 'react-redux';

import List from 'components/list';

import {
  DataTypes,
  SortDirection,
  DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,
  DateFormats,
  NumFormats,
  OperationHistoryTypes
} from 'consts';

import Utils from 'utils';

const mapStateToProps = state => ({
  isVisible: state.visibilityDetailsMenu === DETAILS_MENU_OPERATION_HISTORY_ITEM_ID ||
    !state.visibilityDetailsMenu,

  items: Utils.sort(
      state.operationHistory,
      SortDirection.Descending,
      'date',
      DataTypes.DateTime)
    .map(x => ({
      id: x.id,
      date: Utils.formatDate(
          x.date,
          DateFormats.FullDateWithTime),

      eventName: (() => {
        if (x.type === OperationHistoryTypes.Reserve) {
          return 'Резервирование средств';
        } if (x.type === OperationHistoryTypes.ReturnReserve) {
          return 'Возврат резерва';
        } if (x.type === OperationHistoryTypes.OneTimePayment) {
          return 'Подключение доп. сервиса';
        } if (x.type === OperationHistoryTypes.Fee) {
          const name = Utils.getNameByServiceType(x.serviceType);
          return `Абонентская плата за тариф на ${name}`;
        } else if (x.serviceName) {
          return x.serviceName;
        }

        return x.eventName;
      })(),

      startBalance: Utils.formatNum(
        x.startBalance,
        NumFormats.FixedTwoSymbols),
      changeBalance: Utils.formatNum(
        x.changeBalance,
        NumFormats.FixedTwoSymbols),
      newBalance: Utils.formatNum(
        x.newBalance,
        NumFormats.FixedTwoSymbols),

      css: {
        'transaction-green': x.type === OperationHistoryTypes.Compensation ||
          x.type === OperationHistoryTypes.Payment,
        'transaction-grey': x.type === OperationHistoryTypes.Reserve ||
        x.type === OperationHistoryTypes.ReturnReserve,
        'transaction-black': !!x.serviceName
      },

      type: 'desc',
      subRows: x.serviceName ? [{
        desc: <div className="block-folded__description">
          <span className="dynamic-black-solid">{x.serviceName}</span>
        </div>
      }] :
      null
    })),

  columns: [{
    alias: 'date',
    title: 'Дата и время',
    width: '240px'
  }, {
    alias: 'eventName',
    title: 'Операция',
    width: '310px'
  }, {
    alias: 'startBalance',
    title: 'Начальный баланс в руб.',
    width: '160px'
  }, {
    alias: 'changeBalance',
    title: 'Изменение баланса в руб.',
    width: '160px'
  }, {
    alias: 'newBalance',
    title: 'Конечный баланс в руб.',
    width: '160px'
  }]
});

export default connect(
  mapStateToProps
)(List);
