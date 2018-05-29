import { connectAdvanced } from 'react-redux';

import Internet from 'components/widgets/internet';

import Utils from 'utils';

import {
  selectingMenuItem,
  speedUp,
  speedUpResetAwaiter,
  resetPreset
} from 'actions';

import {
  TOP_MENU_INTERNET_ITEM_ID,
  ServiceTypes,
  SortDirection,
  DataTypes
} from 'consts';

const mapStateToProps = (state) => {
  const inet = ((state.preset || {}).internet || {});
  const vsu = ((state.preset || {}).vsu || {});
  const vsuServices = Utils.sort(
    ((state.preset || {}).items || []).filter(x => x.type === ServiceTypes.Vsu),
    SortDirection.Ascending,
    'fee',
    DataTypes.Numeric
  );

  const servicesCount = inet.servicesCount ?
    Utils.getPluralFormFormatted(
      state.options.additionalServicesWordForms,
      inet.servicesCount) :
    '';

  return {
    title: state.options.internetTitle,
    icon: inet.icon,
    inSpeedText: state.options.internetInSpeedText,
    outSpeedText: state.options.internetOutSpeedText,
    inSpeedValue: `${inet.speedIn} ${state.options.mbPerSecondText}`,
    outSpeedValue: `${inet.speedOut} ${state.options.mbPerSecondText}`,
    servicesCount,
    servicesText: state.options.additionalServicesText,
    note: state.options.internetDescription,
    speedUpText: state.options.internetSpeedUpText,
    addMoreServicesText: state.options.addMoreServicesText,
    isShowVsuLink: (vsuServices || []).length > 0,
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
      }
    }
  };
};


function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    speedUpClick: (vsuService) => {
      dispatch(speedUp(vsuService));
    },

    titleClick() {
      dispatch(selectingMenuItem(TOP_MENU_INTERNET_ITEM_ID));
    },

    servicesClick() {
      dispatch(selectingMenuItem(TOP_MENU_INTERNET_ITEM_ID));
    },

    resetAwaiters: () => {
      dispatch(speedUpResetAwaiter());
    },

    addMoreServices: () => {
      window.location = state.urls.catalogUrl;
    },

    resetPreset: () => {
      dispatch(resetPreset());
    }
  });
}

export default connectAdvanced(selectorFactory)(Internet);
