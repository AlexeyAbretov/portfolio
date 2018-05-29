import { connect } from 'react-redux';

import Password from 'components/settings/credentials/password';

import { changePassword } from 'actions';

const mapStateToProps = state => ({
  account: state.credentials.loginData,
  oldPasswordRequired: true,
  changePasswordAwaiter: state.credentials.changePasswordAwaiter,
  changePasswordResult: state.credentials.changePasswordResult,
  texts: {
    currentPasswordText: 'Текущий пароль',
    newPasswordText: 'Новый пароль',
    shortPasswordText: 'Слишком короткий пароль',
    longPasswordText: 'Слишком длинный пароль',
    badPasswordText: 'Ненадежный',
    avaragePasswordText: 'Средней надежности',
    goodPasswordText: 'Надежный',
    exampleText: 'Например:',
    notePasswordText: 'Пароль должен быть от 6 до 24 символов<br /> и должен содержать цифры и латинские буквы' +
      '<br />в разных регистрах. В целях безопасности<br />никому не сообщайте свой пароль!',
    noteVpnText: 'Пароль для доступа к сети интернет (от VPN-соединения) будет изменен. <br />' +
      'Пароль доступа к услуге домашнего цифрового телефона не изменится',
    saveText: 'Изменить пароль',
    tipOldPassText: 'Только латинские буквы и цифры',
    tipNewPassText: 'Только латинские буквы и цифры',
    changePasswordAwaiter: {
      Loading: 'Пожалуйста подождите',
      Success: 'Новый пароль успешно сохранен',
      Error: 'При смене пароля произошла ошибка, попробуйте повторить позднее'
    }
  }
});

const mapDispatchToProps = dispatch => ({
  changePassword: (data) => {
    dispatch(changePassword(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Password);
