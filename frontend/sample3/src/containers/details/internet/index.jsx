import { connect } from 'react-redux';
import React from 'react';

import List from 'components/list';
import {
  DataTypes,
  NumFormats,
  DateFormats,
  SortDirection,
  INTERNET_GROUP_BY_MONTH_ID,
  INTERNET_GROUP_BY_SESSION_ID,
  DETAILS_MENU_INTERNET_ITEM_ID
} from 'consts';
import Utils from 'utils';

import GroupSwitcher from './switcher';

const getRow = (x, formattedDate, subs) => ({
  id: x.id,
  date: formattedDate,
  duration: Utils.formatNum(
    x.duration,
    NumFormats.Time
  ),
  receive: Utils.formatNum(
    x.receive,
    NumFormats.Mb
  ),
  transfer: Utils.formatNum(
    x.transfer,
    NumFormats.Mb
  ),
  sum: Utils.formatNum(
    x.sum,
    NumFormats.FixedTwoSymbols
  ),
  subRows: subs
});

const getItems = (items, state, selectedInternetGroup) => Utils.sort(
  items || [],
  SortDirection.Descending,
  'date',
  DataTypes.DateTime)
  .filter(x => x.type === selectedInternetGroup)
  .map((x) => {
    let formattedDate = '';

    let subs = null;
    if (x.type === INTERNET_GROUP_BY_MONTH_ID) {
      const date = Utils.formatDate(
        x.date,
        DateFormats.MonthYear);
      formattedDate = date.charAt(0).toUpperCase() + date.slice(1);

      const month = Utils.getMonth(x.date);

      subs = items
        .filter(w => w.type === INTERNET_GROUP_BY_SESSION_ID &&
          Utils.getMonth(w.date) === month)
        .map(m => getRow(
          m,
          Utils.formatDate(
            m.date,
            DateFormats.FullDateWithTime),
          null));
    } else {
      const date = Utils.formatDate(
        x.date,
        DateFormats.FullDateWithTime);
      const result = Utils.formatDate(
        Utils.addSeconds(
          x.date,
          x.duration),
        DateFormats.FullDateWithTime);

      formattedDate = `${date} - ${result}`;
    }

    return getRow(x, formattedDate, subs);
  });

const getFooter = (items, state, selectedInternetGroup) => {
  const filtered = items
    .filter(x => x.type === INTERNET_GROUP_BY_SESSION_ID);

  let date = '';
  if (selectedInternetGroup === INTERNET_GROUP_BY_MONTH_ID) {
    const sorted = Utils.sort(
      filtered,
      SortDirection.Ascending,
      'date',
      DataTypes.DateTime);

    date = 'Всего';

    if (sorted.length > 1) {
      const start = Utils.formatDate(
        sorted[0].date,
        DateFormats.DayNumberMonth);
      const end = Utils.formatDate(
        sorted[sorted.length - 1].date,
        DateFormats.DayNumberMonth);

      date = `Всего с ${start} по ${end}`;
    }
  }

  const duration = Utils.formatNum(
    filtered.reduce((acc, b) => acc + b.duration, 0),
    NumFormats.Time
  );
  const receive = Utils.formatNum(
    filtered.reduce((acc, b) => acc + b.receive, 0),
    NumFormats.Mb
  );
  const transfer = Utils.formatNum(
    filtered.reduce((acc, b) => acc + b.transfer, 0),
    NumFormats.Mb
  );
  const sum = Utils.formatNum(
    filtered.reduce((acc, b) => acc + b.sum, 0),
    NumFormats.FixedTwoSymbols
  );

  return [{
    date,
    duration,
    receive,
    transfer,
    sum
  }];
};

export default class InternetList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: INTERNET_GROUP_BY_MONTH_ID
    };

    this.change = this.change.bind(this);
  }

  change(id) {
    this.setState({
      active: id
    });
  }

  render() {
    const mapStateToProps = (globalState) => {
      const columns = [{
        alias: 'date',
        title: '',
        width: '250px',
        content: <GroupSwitcher click={this.change} active={this.state.active} />
      }, {
        alias: 'duration',
        title: 'Время передачи трафика',
        width: '160px'
      }, {
        alias: 'receive',
        title: 'Принято',
        width: '120px'
      }, {
        alias: 'transfer',
        title: 'Передано',
        width: '120px'
      }];

      if (this.state.active === INTERNET_GROUP_BY_MONTH_ID) {
        columns.push({
          alias: 'sum',
          title: 'Стоимость в руб.',
          width: '200px'
        });
      }

      return {
        isVisible: globalState.visibilityDetailsMenu === DETAILS_MENU_INTERNET_ITEM_ID,

        items: getItems(globalState.internetHistory, globalState, this.state.active),
        footer: globalState.internetHistory.length ?
          getFooter(globalState.internetHistory, globalState, this.state.active) :
          null,

        isHideHeaderIfEmpty: globalState.internetHistory.length === 0,

        css: {
          black: true,
          cell95: true
        },

        columns
      };
    };

    const ConnectedInternetList = connect(
      mapStateToProps
    )(List);

    return (
      <ConnectedInternetList />
    );
  }
}
