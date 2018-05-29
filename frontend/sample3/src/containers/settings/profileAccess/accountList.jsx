import { connect } from 'react-redux';
import {
  deleteAccount
} from '../../../actions';
import AccountItems from '../../../components/settings/profileAccess/accountItems';

const mapStateToProps = state => ({
  items: state.settings.profileAccess.accounts || [],
  texts: {
    rejectAccess: 'Отменить доступ',
    confirmPopup: {
      text: 'Вы уверены, что хотите отменить доступ к управлению аккаунтом {ctn}?',
      ok: 'OK',
      cancel: 'Отмена'
    }
  }
});

const mapDispatchToProps = dispatch => ({
  cancelAccess: (linkedLogin) => {
    dispatch(deleteAccount({ linkedLogin, isCurrentAccSlave: true }));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountItems);
