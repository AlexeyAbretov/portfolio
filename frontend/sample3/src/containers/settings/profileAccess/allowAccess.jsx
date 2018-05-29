import { connect } from 'react-redux';
import {
  acceptInvite,
  rejectInvite,
  cancelInvite,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  enableRequestToLink
} from '../../../actions';
import AllowAccess from '../../../components/settings/profileAccess/allowAccess';

const mapStateToProps = state => ({
  outgoingInvites: state.settings.profileAccess.outgoingInvites || [],
  incomingRequests: state.settings.profileAccess.incomingRequests || [],
  enableRequestToLink: state.settings.profileAccess.requestToLinkEnable,
  texts: {
    enableRequestToLink: 'Запретить другим абонентам запрашивать доступ к управлению моим номером',
    outgoingInvite: {
      reject: 'Отменить предложение',
      note: 'Приглашение отправлено, но еще не принято. Попросите абонента <b>{number}</b> ' +
        'войти в свой личный кабинет и принять ваше приглашение.',
      awaiter: {
        Loading: 'Процесс может занять некоторое время',
        Success: '<p>Вы отменили своё предложение к абоненту <b>{number}</b> для управления вашими услугами.</p>',
        Error: 'Не удалось отклонить запрос. Попробуйте повторить операцию позднее.'
      }
    },
    incomingRequest: {
      accept: 'Разрешить',
      reject: 'Отклонить',
      note: 'Абонент <b>{number}</b> просит разрешить доступ к управлению вашими услугами, тарифами ' +
        'и контролировать ваши расходы. В любой момент Вы можете запретить доступ к своему кабинету.',
      awaiter: {
        Loading: 'Процесс может занять некоторое время',
        Success: '<p>Вы отклонили запрос абонента <b>{number}</b> на предоставление доступа к вашему кабинету.</p>',
        Error: 'Не удалось отклонить запрос. Попробуйте повторить операцию позднее.'
      }
    }
  }
});

const mapDispatchToProps = dispatch => ({
  acceptInvite: (linkedAccount) => {
    dispatch(acceptInvite(linkedAccount));
  },
  rejectInvite: (linkedAccount) => {
    dispatch(rejectInvite(linkedAccount));
  },
  cancelInvite: (linkedAccount) => {
    dispatch(cancelInvite(linkedAccount));
  },
  acceptRequest: (linkedAccount) => {
    dispatch(acceptRequest(linkedAccount));
  },
  rejectRequest: (linkedAccount) => {
    dispatch(rejectRequest(linkedAccount));
  },
  cancelRequest: (linkedAccount) => {
    dispatch(cancelRequest(linkedAccount));
  },
  enableRequestToLinkChange: (e) => {
    dispatch(enableRequestToLink(e.checked));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllowAccess);
