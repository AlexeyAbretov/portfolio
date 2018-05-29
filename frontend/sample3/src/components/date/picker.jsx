/* eslint react/prefer-stateless-function:0 */
/* eslint react/no-array-index-key:0 */
/* eslint jsx-a11y/label-has-for:0 */
/* eslint react/forbid-prop-types: 0 */
/* eslint jsx-a11y/no-static-element-interactions:0 */
/* eslint no-script-url:0 */

import PropTypes from 'prop-types';

import React from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import Utils from 'utils';
import { DateFormats } from 'consts';

export default class DatePicker extends React.Component {
  static getDefaultState(props) {
    const state = {
      isOpen: false,
      date: props.date,
      strDate: Utils.formatDate(
        props.date,
        DateFormats.FullDate),
      year: props.date.year(),
      month: props.date.month(),
    };

    return state;
  }

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.change = this.change.bind(this);

    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);

    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.dateClick = this.dateClick.bind(this);

    this.state = DatePicker.getDefaultState(props);
  }

  componentDidMount() {
    if (document) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      DatePicker.getDefaultState(nextProps));
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  setNewDate(newDate, changeOpen = true) {
    const state = {
      ...this.state
    };

    if (changeOpen) {
      state.isOpen = false;
    }

    const date = newDate;

    if (!date.isValid()) {
      state.date = this.props.date;
    } else if (date < this.props.min) {
      state.date = this.props.min;
    } else if (date > this.props.max) {
      state.date = this.props.max;
    } else {
      state.date = date;
    }

    state.strDate = Utils.formatDate(
      state.date,
      DateFormats.FullDate);

    this.setState(state);
    this.props.onChange(date);
  }

  handleClickOutside(e) {
    const state = {
      ...this.state,
      isOpen: false
    };

    if (this.input !== e.target) {
      this.setState(state);
    }
  }

  focus() {
    this.click();
  }

  click() {
    const state = {
      ...this.state,
      isOpen: true,
      year: this.state.date.year(),
      month: this.state.date.month()
    };

    this.setState(state);
  }

  blur() {
    const state = {
      ...this.state
    };

    const date = moment(state.strDate,
      DateFormats.FullDate, true);

    this.setNewDate(date, false);
  }

  change() {
    const state = {
      ...this.state,
      strDate: this.input.value
    };

    this.setState(state);
  }

  dateClick(date) {
    const newDate = moment({
      years: this.state.year,
      months: this.state.month,
      date
    });

    this.setNewDate(newDate);
  }

  nextYear() {
    const state = {
      ...this.state,
      isOpen: true
    };

    if (this.state.year >= this.props.max.year()) {
      this.setState(state);
      return;
    }

    state.year += 1;

    this.setState(state);
  }

  prevYear() {
    const state = {
      ...this.state,
      isOpen: true
    };

    if (this.state.year <= this.props.min.year()) {
      this.setState(state);
      return;
    }

    state.year -= 1;

    this.setState(state);
  }

  nextMonth() {
    const state = {
      ...this.state,
      isOpen: true
    };

    if (this.state.month >= this.props.max.month() &&
      this.state.year >= this.props.max.year()) {
      this.setState(state);
      return;
    }

    state.month += 1;

    if (state.month > 11) {
      state.month = 11;
    }

    this.setState(state);
  }

  prevMonth() {
    const state = {
      ...this.state,
      isOpen: true
    };

    if (this.state.month <= this.props.min.month() &&
      this.state.year <= this.props.min.year()) {
      this.setState(state);
      return;
    }

    state.month -= 1;

    if (state.month < 0) {
      state.month = 0;
    }

    this.setState(state);
  }

  render() {
    const { isVisible, min, max } = this.props;
    const { isOpen, strDate, date, year, month } = this.state;

    if (!isVisible) {
      return null;
    }

    const display = isOpen ? 'block' : 'none';

    const weekdaysShort = moment.weekdaysShort(true);
    const monthName = moment.months(month);
    const weekdayNames = weekdaysShort.map(x => <th key={x}><span>{x}</span></th>);

    const renderDate = moment({
      years: year,
      months: month,
      date: 1
    });

    let dayIndex = renderDate.startOf('month').day();
    dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

    const daysCount = renderDate.daysInMonth();

    const datesArray = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]];

    let line = 0;
    let pos = dayIndex;
    for (let i = 1; i <= daysCount; i += 1) {
      const resultOfMod = pos % 7;

      if (resultOfMod === 0) {
        line += 1;
        pos = 0;
      }

      datesArray[line][pos] = i;

      pos += 1;
    }

    const dateClick = this.dateClick;
    const days = datesArray.map((x) => {
      const week = x.map((w, i) => {
        if (w === 0) {
          return (<td
            key={`empty_${x}_${i}`}
            className="ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled"
          >&nbsp;</td>);
        }

        const css = classNames({
          'ui-state-default': true,
          'ui-state-active': w === date.date() && month === date.month() &&
          year === date.year()
        });

        const tdCss = classNames({
          'ui-datepicker-current-day': w === date.date() && month === date.month() &&
          year === date.year()
        });

        return (<td className={tdCss} key={`date_${w}`}>
          <a className={css} href="javascript:void(0)" onClick={() => dateClick(w)}>{w}</a>
        </td>);
      });

      return <tr key={`week_${x}`}>{week}</tr>;
    });

    const yearPrevCss = classNames({
      'ui-datepicker-prev year-prev ui-corner-all': true,
      'ui-state-disabled': year <= min.year()
    });

    const yearNextCss = classNames({
      'ui-datepicker-next year-next ui-corner-all': true,
      'ui-state-disabled': year >= max.year()
    });

    const monthPrevCss = classNames({
      'ui-datepicker-prev ui-corner-all': true,
      'ui-state-disabled': year <= min.year() && month <= min.month()
    });

    const monthNextCss = classNames({
      'ui-datepicker-next ui-corner-all': true,
      'ui-state-disabled': year >= max.year() && month >= max.month()
    });

    return (
      <div className="input date">
        <input
          type="text"
          className="hasDatepicker"
          value={strDate}
          onBlur={this.blur}
          onChange={this.change}
          onFocus={this.focus}
          ref={(elem) => { this.input = elem; }}
        />
        <span className="date-icon" onClick={this.click} />

        <div
          id="ui-datepicker-div"
          className="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"
          style={{ position: 'absolute', top: '20px', left: '100px', zIndex: 2147483647, display }}
        >
          <div className="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
            <a
              className={monthPrevCss}
              title="<Пред"
              onClick={this.prevMonth}
            >
              <span className="ui-icon ui-icon-circle-triangle-w">&lt;Пред</span>
            </a>
            <a className={monthNextCss} title="След>" onClick={this.nextMonth}>
              <span className="ui-icon ui-icon-circle-triangle-e">След&gt;</span>
            </a>
            <div className="ui-datepicker-title">
              <span className="ui-datepicker-month">{monthName}</span>&nbsp;
              <span className="ui-datepicker-year">{year}</span>
            </div>
          </div>
          <table className="ui-datepicker-calendar">
            <thead>
              <tr>
                {weekdayNames}
              </tr>
            </thead>
            <tbody>
              {days}
            </tbody>
          </table>
          <span className="datepicker-tail" />
          <div className="ui-year-select ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
            <a
              className={yearPrevCss}
              data-handler="prev"
              data-event="click"
              title="<Пред"
              onClick={this.prevYear}
            >
              <span className="ui-icon ui-icon-circle-triangle-w">&lt;Пред</span>
            </a>
            <a
              className={yearNextCss}
              title="След>"
              onClick={this.nextYear}
            >
              <span className="ui-icon ui-icon-circle-triangle-e">След&gt;</span>
            </a>
            <div className="ui-datepicker-title">
              <span className="ui-datepicker-year">{year}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = {
  isVisible: PropTypes.bool,
  date: PropTypes.any,
  min: PropTypes.any,
  max: PropTypes.any,
  onChange: PropTypes.func
};

DatePicker.defaultProps = {
  isVisible: true,
  date: null,
  min: null,
  max: null,
  onChange: () => { }
};
