import {
  getAvailableMappings
} from 'selectors/mappings';

import {
    GridRowStatus,
    MappingState
} from 'consts';

export default ({ row, preset, service, state } = {}) => {
  if (preset.isConnected) {
    return row;
  }

  const mappings = getAvailableMappings(state);

  const mappingsByPreset = mappings
    .find(x => x.id === preset.id) || {};

  const serviceState = ((mappingsByPreset.states || [])
    .find(x => x.id === service.id) || {}).state;

  if (!serviceState) {
    return row;
  }

  if ((serviceState === MappingState.Change ||
      serviceState === MappingState.Select) &&
      (service.isPreInclude || service.isRequired)) {
    return row;
  }

  if ((serviceState === MappingState.Change ||
      serviceState === MappingState.Select) &&
      service.isAllow) {
    return {
      ...row,
      status: GridRowStatus.Connected
    };
  }

  if (serviceState === MappingState.Delete) {
    const anotherServices = (preset.services || [])
        .filter(x => x.type === service.type &&
          x.id !== service.id);

    const withDeleteStatus = anotherServices
        .filter(x => ((mappingsByPreset.states || [])
            .find(w => w.id === x.id) || {}).state === MappingState.Delete);

    if (anotherServices.length &&
        anotherServices.length !== withDeleteStatus.length) {
      return {
        ...row,
        status: GridRowStatus.Allow
      };
    }

    return null;
  }

  return row;
};

