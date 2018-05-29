import { connect } from 'react-redux';
import AddProfile from '../../../components/settings/profileAccess';
import {
  createLinkRequest,
  getLoginInfo
} from '../../../actions';

const mapStateToProps = state => ({
  loginInfo: state.settings.loginInfo,
  loginInfoAwaiter: state.settings.loginInfoAwaiter,
  createLinkRequestAwaiter: state.settings.createLinkRequestAwaiter,
  reset: state.settings.reset,
  canEditNumber: true,
  account: {},
  texts: {
    title: 'Отправить приглашение...',
    unknownPassword: {
      title: 'Не знаю пароль',
      loginExist: 'Такой логин существует и для домашнего и для мобильного кабинета. Какой кабинет вам нужен?',
      mobile: 'Мобильный',
      home: 'Домашний',
      allowAccessInfo: 'Владелец номера подтвердит привязку через свой личный кабинет.',
      allowAccessDescription: 'Номер будет добавлен в ваш личный кабинет после того, ' +
        'как другой абонент подтвердит ваш запрос в своём личном кабинете.',
      sendRequest: 'Отправить заявку',
      rejectRequest: 'Отменить отправку',
      sendRequestDescription: 'После отправки приглашения абонент <span className="black">{login}</span> ' +
        'должен подтвердить запрос в своем личном кабинете',
      enterLogin: 'Введите логин кабинета для добавления',
      confirmLogin: 'Подтвердить',
      infoLogin: 'Номер телефона в формате 9037125674 (без +7, пробелов и скобок), ' +
        'или номер лицевого счёта Домашнего Билайн в формате 08ХХХХХХХХ, или логин из букв и цифр.',
      loginInfoAwaiter: {
        Loading: 'Процесс может занять некоторое время',
        Error: 'Абонент не существует'
      },
      createLinkRequestAwaiter: {
        Loading: 'Процесс может занять некоторое время',
        Error: state.settings.createLinkRequestAwaiter.message
      }
    }
  }
});

const mapDispatchToProps = dispatch => ({
  getLoginInfo: (login) => {
    dispatch(getLoginInfo(login));
  },
  createLinkRequest: (login, userType) => {
    dispatch(createLinkRequest({ login, userType }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProfile);
