/* eslint react/prefer-stateless-function:0 */
/* eslint react/forbid-prop-types: 0 */

import PropTypes from 'prop-types';

import React from 'react';

import
  Button,
  {
    ButtonIcon
  } from '../button';

import DatePicker from './picker';

export default class DateRange extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);

    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      startDate: nextProps.startDate,
      endDate: nextProps.endDate
    });
  }

  onStartDateChange(date) {
    this.setState({
      startDate: date,
      endDate: this.state.endDate
    });
  }

  onEndDateChange(date) {
    this.setState({
      startDate: this.state.startDate,
      endDate: date
    });
  }

  click() {
    this.props.click(
      this.state.startDate,
      this.state.endDate);
  }

  render() {
    const { startDate, endDate } = this.state;
    const { isVisible, min, max } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <div className="filterDetalization">
        <div className="filter-detail">
          <div className="block-period">
            <DatePicker date={startDate} min={min} max={max} onChange={this.onStartDateChange} />
            <span className="date-sep" />
            <DatePicker date={endDate} min={min} max={max} onChange={this.onEndDateChange} />
          </div>
          <Button
            icon={ButtonIcon.Reload}
            click={this.click}
            text="Обновить"
          />
        </div>
      </div>
    );
  }
}

DateRange.propTypes = {
  isVisible: PropTypes.bool,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  click: PropTypes.func,
  min: PropTypes.any,
  max: PropTypes.any
};

DateRange.defaultProps = {
  isVisible: true,
  startDate: null,
  endDate: null,
  click: () => { },
  min: null,
  max: null
};
