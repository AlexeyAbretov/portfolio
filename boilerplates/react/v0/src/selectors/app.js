import {
  createSelector
} from 'reselect';

import getState from '.';

const getProps = createSelector(
  [getState],
  state => ({
    title: state.title
  })
);

export default getProps;
