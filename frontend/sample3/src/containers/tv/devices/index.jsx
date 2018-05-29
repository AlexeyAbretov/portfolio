import { connect } from 'react-redux';

import Devices from 'components/tv/devices';

import {
  getConnectedTvConsoles
} from 'selectors/presets';

import Utils from 'utils';
import {
  NumFormats,
  SortDirection,
  DataTypes
} from 'consts';

const mapStateToProps = (state) => {
  const items = Utils.sort(
    getConnectedTvConsoles(state)
      .map(x => ({
        id: x.id,
        title: state.options.consoleText,
        name: x.title,
        macTitle: state.options.macAddressText,
        mac: x.mac,
        feeType: x.fee ?
          state.options.rentText :
          state.options.buyText,
        fee: x.fee ? `${Utils.formatNum(
          x.fee,
          NumFormats.FixedHideZero)} ${state.options.rubSymbol}` :
          ''
      })),
      SortDirection.Ascending,
      'id',
      DataTypes.String);

  return {
    title: state.options.tvEquipmentsText,
    items,
    isVisible: !!items.length
  };
};

export default connect(
    mapStateToProps
)(Devices);
