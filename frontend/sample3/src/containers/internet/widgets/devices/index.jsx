import { connect } from 'react-redux';

import Devices from 'components/internet/devices';
import {
  ServiceTypes,
  SortDirection,
  DataTypes
} from 'consts';
import Utils from 'utils';

const mapStateToProps = state => ({
  title: state.options.tvEquipmentsText,
  deviceType: state.options.routerTypeText,
  macText: state.options.macAddressText,
  routerSerialText: state.options.serialText,
  backRouterText: state.options.returnRouterButtonText,
  installmentText: state.options.installmentText,
  currencyAndDelayText: `${state.options.rubSymbol}/${state.options.monthText}`,
  rubSymbol: state.options.rubSymbol,
  devices: Utils.sort(
    ((state.preset || {}).items || []).filter(x => x.type === ServiceTypes.WifiRent),
    SortDirection.Ascending,
    'id',
    DataTypes.String)
});

const mapDispatchToProps = () => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Devices);
