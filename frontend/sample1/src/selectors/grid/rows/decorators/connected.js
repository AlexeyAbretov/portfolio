import {
    GridRowStatus,
    GridRowType
  } from 'consts';

export default ({ row, preset } = {}) => {
  if (preset.isConnected) {
    if (row.status === GridRowStatus.Allow) {
      return null;
    }

    return {
      ...row,
      status: row.status === GridRowStatus.Connected ?
        GridRowStatus.Default :
        row.status,
      type: GridRowType.Inline
    };
  }

  return row;
};
