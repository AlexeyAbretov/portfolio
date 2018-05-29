import { connect } from 'react-redux';
import {
  selectMenuItem,
  selectingSettingsMenuItem,
  deleteAccount,
  changeDefaultSsoLogin,
  cancelRequest,
  acceptInvite,
  rejectInvite,
  blockAccount
} from '../../../actions';
import {
  TOP_MENU_PROFILE_ITEM_ID,
  SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID,
  TOP_MENU_MESSAGES_ITEM_ID
} from '../../../consts';
import AccountItems from '../../../components/settings/accountItems';

const mapStateToProps = state => ({
  items: state.settings.manageAccounts || [],
  outgoingRequests: state.settings.outgoingRequests || [],
  incomingInvites: state.settings.incomingInvites || [],
  sharedData: state.sharedData || {},
  addAccountToCurrentAwaiter: state.settings.addAccountToCurrentAwaiter,
  texts: {
    note: '<span>Добавьте номера и договоры мобильного и домашнего "Билайна" ваших родных и близких и контролируйте ' +
      'их расходы, управляйте услугами и тарифами, не выходя из своего личного кабинета.</span>' +
      ' Если у вас есть номера других операторов, воспользуйтесь услугой «' +
      '<a href="{javascript:void(0)}">Переход в "Билайн" со своим номером</a>».',
    addAccountToCurrentAwaiter: {
      Success: `Абонент ${state.settings.addAccountToCurrentAwaiter.login} успешно привязан к вашему кабинету`
    },
    accountItem: {
      block: 'Заблокировать',
      noBlock: 'Не блокировать',
      waitBlock: 'Ожидает блокировки',
      blocked: 'Заблокирован',
      save: 'Сохранить',
      edit: 'Редактировать',
      reject: 'Отказаться от доступа',
      rejectChanges: 'Отменить изменения',
      manage: 'Перейти к управлению',
      changePassword: 'Сменить пароль',
      note: 'Вы можете заблокировать доступ к услугам на срок до {maxBlockDays} дней',
      showFirst: 'Показывать номер первым при входе в личный кабинет',
      awaiter: {
        Loading: 'Процесс может занять некоторое время',
        Error: 'Не удалось изменить статус блокировки. Попробуйте повторить операцию позднее.'
      },
      confirmPopup: {
        text: 'Вы уверены, что хотите отказаться от управления аккаунтом {ctn}?',
        ok: 'OK',
        cancel: 'Отмена'
      }
    },
    incomingInvites: {
      accept: 'Принять запрос',
      reject: 'отклонить',
      note: 'Абонент <b>{number}</b> предлагает вам управлять его услугами, тарифами и контролировать его расходы.',
      awaiter: {
        Loading: 'Процесс может занять некоторое время',
        Success: '<p>Вы отклонили запрос абонента <b>{number}</b> ' +
            'на предоставление доступа к управлению его услугами.</p>',
        Error: 'Не удалось отклонить запрос. Попробуйте повторить операцию позднее.'
      }
    },
    outgoingRequest: {
      reject: 'Отменить запрос',
      note: 'Запрос отправлен, но еще не принят. Попросите абонента <b>{number}</b> ' +
        'войти в свой личный кабинет и принять ваш запрос.',
      awaiter: {
        Loading: 'Процесс может занять некоторое время',
        Success: '<p>Вы отменили свой запрос к абоненту <b>{number}</b> на предоставление доступа к его кабинету.</p>',
        Error: 'Не удалось отклонить запрос. Попробуйте повторить операцию позднее.'
      }
    }
  }
});

const mapDispatchToProps = dispatch => ({
  manageAccountClick: () => {
    dispatch(selectMenuItem(TOP_MENU_PROFILE_ITEM_ID));
  },
  changePasswordClick: () => {
    dispatch(selectingSettingsMenuItem(SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID));
  },
  messageClick: () => {
    dispatch(selectMenuItem(TOP_MENU_MESSAGES_ITEM_ID));
  },
  blockNumberClick: (data) => {
    dispatch(blockAccount(data));
  },
  deleteAccountClick: (linkedLogin) => {
    dispatch(deleteAccount({ linkedLogin, isCurrentAccSlave: false }));
  },
  changeDefaultSsoLoginClick: (login, ctn) => {
    dispatch(changeDefaultSsoLogin({ login, ctn }));
  },
  acceptInvite: (linkedAccount) => {
    dispatch(acceptInvite(linkedAccount));
  },
  rejectInvite: (linkedAccount) => {
    dispatch(rejectInvite(linkedAccount));
  },
  cancelRequest: (linkedAccount) => {
    dispatch(cancelRequest(linkedAccount));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountItems);
