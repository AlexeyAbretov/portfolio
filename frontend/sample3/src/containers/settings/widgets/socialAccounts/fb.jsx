import { connect } from 'react-redux';
import SocialAccount from '../../../../components/settings/socialAccount';
import { SocialType } from '../../../../consts';
import { deleteSocialAccount } from '../../../../actions';

const mapStateToProps = state => ({
  account: state.socialAccounts.fb,
  socialType: SocialType.FB,
  socialAwaiter: state.socialAccounts.fbAwaiter,
  shared: state.sharedData,
  texts: {
    add: 'Добавить Фэйсбук...',
    delete: 'Удалить',
    balance: 'Баланс «Билайн»',
    socialAwaiter: {
      Loading: 'Удаляем привязку профиля Facebook',
      Error: 'Не удалось удалить привязку профиля Facebook. Попробуйте повторить операцию позднее.'
    }
  }
});

const mapDispatchToProps = dispatch => ({
  deleteSocialAccount: (socialId) => {
    dispatch(deleteSocialAccount({ socialId, socialName: SocialType.FB }));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialAccount);
