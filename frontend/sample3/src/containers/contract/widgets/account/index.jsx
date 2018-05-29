import { connectAdvanced } from 'react-redux';

import Account from 'components/widgets/account';

import Utils from 'utils';
import {
    DateFormats,
    NumFormats,
    FttbAccountStatus,

    TOP_MENU_SETTINGS_ITEM_ID,
    SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID
} from 'consts';

import {
  selectingMenuItem,
  selectingSettingsMenuItem
} from 'actions';

const mapStateToProps = state => ({
  title: 'Все ОК',
  icon: 'http://static.vendordev.ru/upload/images/home/profile/account-icon.png',
  balanceText: state.options.balanceText,
  balanceValue: Utils.formatNum(
    state.info.balance,
    NumFormats.FixedTwoSymbols
  ),
  rubSymbol: state.options.rubSymbol,
  perMonthText: state.options.perMonthText,
  feeText: state.options.feeText,
  feeValue: Utils.formatNum(
    state.info.currentFee,
    NumFormats.FixedTwoSymbols
  ),
  paymentText: state.options.nextPayText,
  paymentValue: Utils.formatNum(
    state.info.nextPayment,
    NumFormats.FixedTwoSymbols
  ),
  paymentDateText: state.options.nextPayDateText,
  paymentDateValue: Utils.formatDate(
    state.info.paymentPeriod,
    DateFormats.FullDateWithTime
  ),
  statusText: state.options.statusText,
  statusValue: state.options.statusValueTexts[
    (`status${state.info.status}`)],
  blocked: state.info.status !== FttbAccountStatus.Active,
  tariffText: state.options.tariffLinkText,
  blockNumberText: state.options.blockLinkText
});

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    tariffClick: () => {
      window.location = state.urls.currentPresetUrl;
    },

    blockClick: () => {
      dispatch(selectingMenuItem(TOP_MENU_SETTINGS_ITEM_ID));
      dispatch(selectingSettingsMenuItem(SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID));
    }
  });
}

export default connectAdvanced(selectorFactory)(Account);
