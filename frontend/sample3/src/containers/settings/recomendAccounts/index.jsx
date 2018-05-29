/* eslint no-unused-vars:0 */

import { connect } from 'react-redux';
import AddAccountList from '../../../components/settings/addAccount/addAccountList';
import { addAccountToCurrent, getLoginInfo, createLinkRequest } from '../../../actions';

const mapStateToProps = state => ({
  loginInfo: state.settings.loginInfo,
  loginInfoAwaiter: state.settings.loginInfoAwaiter,
  addAccountToCurrentAwaiter: state.settings.addAccountToCurrentAwaiter,
  createLinkRequestAwaiter: state.settings.createLinkRequestAwaiter,
  reset: state.settings.reset,
  recomendedList: state.settings.recommendations || [],
  canEditNumber: false,
  texts: {
    bind: 'Привязать договор',
    hide: 'Скрыть',
    knownPassword: {
      title: 'Я знаю пароль от личного кабинета добавляемого номера или договора',
      description: 'Необходимо указать логин и пароль от личного кабинета того абонента,<br />' +
        'доступ к услугам которого вы хотите получить',
      enterLogin: 'Введите логин кабинета для добавления',
      confirmLogin: 'Подтвердить',
      loginDescription: 'Номер телефона в формате 9037125674 (без +7, пробелов и скобок), ' +
        'или номер лицевого счёта Домашнего Билайн в формате 08ХХХХХХХХ, или логин из букв и цифр.',
      loginExist: 'Такой логин существует и для домашнего и для мобильного кабинета. Какой кабинет вам нужен?',
      mobile: 'Мобильный',
      home: 'Домашний',
      enterPassword: 'Введите пароль от добавляемого кабинета',
      agreement: 'Нажимая на кнопку "Добавить", я соглашаюсь с условиями предоставления услуги',
      add: 'Добавить',
      reject: 'Отменить отправку',
      loginInfoAwaiter: {
        Loading: 'Процесс может занять некоторое время',
        Error: 'Абонент не существует'
      },
      addAccountToCurrentAwaiter: {
        Loading: 'Процесс может занять некоторое время',
        Error: state.settings.addAccountToCurrentAwaiter.message
      }
    },
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
  addAccountToCurrent: (login, password, userType) => {
    dispatch(addAccountToCurrent({ login, password, userType }));
  },
  createLinkRequest: (login, userType) => {
    dispatch(createLinkRequest({ login, userType }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAccountList);
