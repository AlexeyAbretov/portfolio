/* eslint dot-notation: 0 */

import { connectAdvanced } from 'react-redux';

import DateRange from 'components/date/range';

import { setDetailsFilter } from 'actions';
import Utils from 'utils';
import { DateMeasure, Locales } from 'consts';

function selectorFactory(dispatch) {
  return (state) => {
    const click = (startDate, endDate) => dispatch(setDetailsFilter(
      state.visibilityDetailsMenu,
      startDate,
      endDate));

    const { startDate, endDate } = state.detailsFilter[state.visibilityDetailsMenu];

    return {
      startDate,
      endDate,
      min: Utils.today(-6, Locales.Ru, DateMeasure.Month),
      max: Utils.today(),
      click
    };
  };
}

export default connectAdvanced(selectorFactory)(DateRange)
;
