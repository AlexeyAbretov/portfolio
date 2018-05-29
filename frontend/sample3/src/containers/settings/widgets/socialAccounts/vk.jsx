import { connect } from 'react-redux';
import SocialAccount from '../../../../components/settings/socialAccount';
import { SocialType } from '../../../../consts';
import { deleteSocialAccount } from '../../../../actions';

const mapStateToProps = state => ({
  account: state.socialAccounts.vk,
  socialType: SocialType.VK,
  socialAwaiter: state.socialAccounts.vkAwaiter,
  shared: state.sharedData,
  texts: {
    add: 'Добавить ВКонтакте...',
    delete: 'Удалить',
    balance: 'Баланс «Билайн»',
    socialAwaiter: {
      Loading: 'Удаляем привязку профиля ВКонтакте',
      Error: 'Не удалось удалить привязку профиля ВКонтакте. Попробуйте повторить операцию позднее.'
    }
  }
});

const mapDispatchToProps = dispatch => ({
  deleteSocialAccount: (socialId) => {
    dispatch(deleteSocialAccount({ socialId, socialName: SocialType.VK }));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialAccount);
