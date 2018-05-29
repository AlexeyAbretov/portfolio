import { connect } from 'react-redux';

import Services from 'components/internet/services';
import {
  ServiceTypes,
  SortDirection,
  DataTypes
} from 'consts';
import { addService, addServiceResetAwaiter, resetPreset } from 'actions';
import Utils from 'utils';

const mapStateToProps = state => ({
  title: state.options.additionalServicesTitle,
  currencyAndDelayText: `${state.options.rubSymbol}/${state.options.monthText}`,
  services: Utils.sort(
    ((state.preset || {}).items || []).filter(x => [
      ServiceTypes.StaticIp,
      ServiceTypes.Firewall,
      ServiceTypes.Eset,
      ServiceTypes.DrWeb,
      ServiceTypes.Kasper,
      ServiceTypes.TurboButton
    ].indexOf(x.type) > -1),
    SortDirection.Ascending,
    'id',
    DataTypes.String),
  popup: {
    addservice: {
      title: state.options.internetAddServicePopupTitle,
      description: state.options.internetAddServicePopupDescription,
      saveAddText: state.options.internetAddServicePopupSaveText,
      saveRemoveText: state.options.internetRemoveServicePopupSaveText,
      fullFee: ((state.preset || {}).internet || {}).fullFee,
      addServiceAwaiter: state.addService,
      successText: state.options.internetChangeServiceResultTexts.success,
      failText: state.options.internetChangeServiceResultTexts.fail
    }
  }
});

const mapDispatchToProps = dispatch => ({
  connectService: (service) => {
    dispatch(addService(service));
  },
  resetAwaiters: () => {
    dispatch(addServiceResetAwaiter());
  },
  resetPreset: () => {
    dispatch(resetPreset());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
