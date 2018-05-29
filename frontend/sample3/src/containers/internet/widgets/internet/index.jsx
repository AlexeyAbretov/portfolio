import { connect } from 'react-redux';

import Internet from 'components/internet';
import { ServiceTypes, SortDirection, DataTypes } from 'consts';
import {
  changeTariff,
  changeTariffResetAwaiter,
  speedUp,
  speedUpResetAwaiter,
  resetPreset
} from 'actions';
import Utils from 'utils';

const mapStateToProps = (state) => {
  const inet = ((state.preset || {}).internet || {});
  const vsu = ((state.preset || {}).vsu || {});
  const tariffs = Utils.sort(
    ((state.preset || {}).items || [])
      .filter(x => x.type === ServiceTypes.Internet && !x.connected),
      SortDirection.Ascending,
      'id',
      DataTypes.String);
  const vsuServices = Utils.sort(
    ((state.preset || {}).items || []).filter(x => x.type === ServiceTypes.Vsu),
    SortDirection.Ascending,
    'fee',
    DataTypes.Numeric
  );

  return {
    title: state.options.internetTitle,
    fullFeeText: `${inet.fullFee} ${state.options.rubSymbol}/${state.options.monthText}`,
    tariffText: state.options.tariffText,
    name: inet.name,
    benefit: inet.benefit,
    feeText: `${inet.fee} ${state.options.rubSymbol}/${state.options.monthText}`,
    currencyAndDelayText: `${state.options.rubSymbol}/${state.options.monthText}`,
    icon: inet.icon,
    speedInText: `${inet.speedIn} ${state.options.mbPerSecondText}`,
    upSpeedText: state.options.internetSpeedUpText,
    changeTariffText: state.options.changeTariffLinkText,
    isShowChangeTariffLink: (tariffs || []).length > 0,
    isShowVsuButton: (vsuServices || []).length > 0,
    toText: state.options.toText,
    speedText: state.options.mbPerSecondText,
    tariffs,
    popup: {
      upspeed: {
        title: state.options.speedUpTitle,
        benefit: state.options.internetUpspeedPopupBenefit,
        vsuServices,
        vsu,
        currentSpeedText: state.options.speedUpCurrentText,
        toText: state.options.toText,
        vsuServiceText: state.options.speedUpSmallText,
        saveText: state.options.saveButtonText,
        rubSymbol: state.options.rubSymbol,
        speedText: state.options.mbPerSecondText,
        currencyAndDelayText: `${state.options.rubSymbol}/${state.options.monthText}`,
        speed: inet.speed,
        speedIn: inet.speedIn,
        speedUp: inet.speedUp,
        speedUpAwaiter: state.speedUp,
        successText: state.options.internetSpeedUpResultTexts.success,
        failText: state.options.internetSpeedUpResultTexts.fail
      },
      changetariff: {
        title: state.options.internetChangetariffPopupTitle,
        description: state.options.internetChangetariffPopupDescription,
        saveText: state.options.internetChangetariffPopupSaveText,
        changeTariffAwaiter: state.changeTariff,
        fullFee: inet.fullFee,
        currentFee: inet.fee,
        speedText: state.options.mbPerSecondText,
        successText: state.options.internetChangeTariffResultTexts.success,
        failText: state.options.internetChangeTariffResultTexts.fail,
      }
    }
  };
};

const mapDispatchToProps = dispatch => ({
  speedUpClick: (vsuService) => {
    dispatch(speedUp(vsuService));
  },
  changeTariff: (tariff) => {
    dispatch(changeTariff(tariff));
  },
  resetAwaiters: () => {
    dispatch(changeTariffResetAwaiter());
    dispatch(speedUpResetAwaiter());
  },
  resetPreset: () => {
    dispatch(resetPreset());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Internet);
