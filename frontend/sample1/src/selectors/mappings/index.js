import { createSelector } from 'reselect';

import {
  getState
} from 'selectors';

import {
  MappingState
} from 'consts';

export const getMappings = createSelector(
    [getState],
    state => state.mappings || {});

export const getAvailableMappings = createSelector(
    [getMappings],
    mappings => mappings.available || []);

export const getServiceMappingState = ({ mappings, preset, service } = {}) => {
  const mappingsByPreset = (mappings || [])
    .find(x => x.id === preset.id) || {};

  return ((mappingsByPreset.states || [])
    .find(x => x.id === service.id) || {}).state;
};

export const SavedMappingStates = [
  MappingState.Change,
  MappingState.Select
];

export const isServiceMapped = ({ mappings, preset, service } = {}) => {
  const state = getServiceMappingState({ mappings, preset, service });

  return SavedMappingStates.includes(state);
};

