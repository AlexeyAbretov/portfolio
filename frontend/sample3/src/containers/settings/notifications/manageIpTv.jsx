import { connect } from 'react-redux';
import { changeManageIpTv } from '../../../actions';
import ManageIpTv from '../../../components/settings/notifications/manageIpTv';

const mapStateToProps = state => ({
  consoles: state.manageIpTv.consoles || [],
  hideAwaiter: state.manageIpTv.hideAwaiter
});

const mapDispatchToProps = dispatch => ({
  save: (_console) => {
    dispatch(changeManageIpTv(_console));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManageIpTv);
