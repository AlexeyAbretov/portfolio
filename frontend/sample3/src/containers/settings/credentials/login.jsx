import { connect } from 'react-redux';
import Login from '../../../components/settings/credentials/login';
import { changeLogin } from '../../../actions';

const mapStateToProps = state => ({
  account: state.credentials.loginData,
  shared: state.sharedData,
  changeLoginAwaiter: state.credentials.changeLoginAwaiter,
  texts: {
    tipNewLogin: 'Введите новый логин',
    tipEditLogin: 'от 5 до 20 символов, латинские буквы и/или цифры, нижний регистр, первый символ всегда буква',
    login: 'Логин',
    currentLogin: 'Текущий логин',
    newLogin: 'Новый логин',
    noteInfoLogin: 'Логин будет использоваться для входа в систему вместо номера договора',
    noteChangeLogin: 'Изменить логин можно только один раз',
    save: 'Изменить логин',
    reject: 'Отменить изменения',
    notifSuccess1: `<b><span>${state.credentials.loginData.nickName}</span></b>` +
      ' успешно установлен в качестве Вашего логина. ' +
      'Для доступа к сети Интернет Вы можете продолжать использовать в качестве логина ' +
      `<span>${state.credentials.loginData.ctn}</span> или `,
    notifSuccess2: ' с измененным логином. Обратите внимание, что оплата услуг по ' +
      'Вашему договору должна производиться на лицевой счет ' +
      `<span>${state.credentials.loginData.ctn}</span>`,
    notifSuccessLink: 'перенастроить соединение',
    changeLoginAwaiter: {
      Loading: 'Процесс может занять некоторое время',
      Success: '',
      Error: 'Операция не выполнена. Попробуйте повторить операцию позднее.'
    }
  }
});

const mapDispatchToProps = dispatch => ({
  changeLogin: (data) => {
    dispatch(changeLogin(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
