import {
  getChanges
} from 'selectors';

import {
    GridRowStatus
} from 'consts';

export default ({ row, preset, state } = {}) => {
  const changes = getChanges(state);

  if (!changes[preset.id] ||
      preset.isConnected) {
    return row;
  }

  const added = (changes[preset.id] || {}).added || [];
  const removed = (changes[preset.id] || {}).removed || [];

  const service = (preset.services || [])
      .find(x => x.id === row.id);

  if (service.isAllow) {
    return {
      ...row,
      status: added
          .find(x => x.id === row.id) ?
            GridRowStatus.Connected :
            GridRowStatus.Allow
    };
  } else if (service.isRequired ||
      service.isPreInclude) {
    return {
      ...row,
      status: removed
          .find(x => x.id === row.id) ?
            GridRowStatus.Allow :
            GridRowStatus.Default
    };
  }

  return row;
};
