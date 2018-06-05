import { createSelector } from 'reselect';
import {
  getState
} from 'selectors';

export const getMappings = createSelector(
    [getState],
    state => state.mappings || {});

export const getAvailableMappings = createSelector(
    [getMappings],
    mappings => mappings.available || []);
