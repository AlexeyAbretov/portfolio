import { connect } from 'react-redux';

import Payment from 'components/widgets/payment';
import Utils from 'utils';
import {
    DateFormats
} from 'consts';
import {
  immediatePayFromCustomerCard,
  immediatePayFromCustomerCardResetAwaiter,
  activatePromisePayment,
  activatePromisePaymentResetAwaiter,
  allPaymentTypes
} from 'actions';

const mapStateToProps = state => ({
  icons: state.options.paymentIcons,
  title: state.options.paymentTitle,
  sumNote: state.options.paymentSumNote,
  note: state.info.hasCreditCard ?
    `${state.options.paymentCardNumberText} **** ${state.info.cardNumber}` :
    state.options.paymentNote,
  rubSymbol: state.options.rubSymbol,
  buttonText: state.options.paymentButtonText,
  promisePaymentLinkText: state.options.promisePaymentLinkText,
  paymentTypesLinkText: state.options.paymentTypesText,
  hasPromisePayment: !!state.info.promisedPaymentSum,
  promisePaymentNote: state.info.promisedPaymentSum ?
    Utils.format(
        state.options.promisePaymentNote || '{0} {1} {2} {3}',
        Utils.formatDate(
            state.info.payOffDate,
            DateFormats.FullDateWithTime
        ),
        state.info.debit,
        state.options.rubSymbol,
        '') :
    '',
  paymentAwaiter: state.pay,
  paymentResultTexts: state.options.paymentResultTexts,
  paymentPopupButtonOkText: state.options.paymentPopupButtonOkText,
  paymentPopupButtonCancelText: state.options.paymentPopupButtonCancelText,
  paymentPopupText: `${state.options.paymentPopupText} **** ${state.info.cardNumber}`,
  promisePaymentAwaiter: state.activatePromisePayment,
  promisePaymentResultTexts: state.options.promisePaymentResultTexts,
  promisePaymentPopupButtonOkText: state.options.promisePaymentPopupButtonOkText,
  promisePaymentPopupButtonCancelText: state.options.promisePaymentPopupButtonCancelText,
  promisePaymentPopupText: state.options.promisePaymentPopupText
});

const mapDispatchToProps = dispatch => ({
  activatePromisePayment: () => {
    dispatch(activatePromisePayment());
  },
  pay: (sum) => {
    dispatch(immediatePayFromCustomerCard(sum));
  },
  resetAwaiters: () => {
    dispatch(immediatePayFromCustomerCardResetAwaiter());
    dispatch(activatePromisePaymentResetAwaiter());
  },
  allPaymentTypesClick: () => {
    dispatch(allPaymentTypes());
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payment);
