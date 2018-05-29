import { connectAdvanced } from 'react-redux';

import Address from 'components/widgets/address';
import Utils from 'utils';
import { DateFormats } from 'consts';
import { showRelocationDialog } from 'actions';
import Relocation from '../relocation';

const mapStateToProps = state => ({
  title: state.options.addressTitle,
  address: state.info.address,
  changeLinkText: state.options.addressChangeLinkText,
  cancelLinkText: state.options.addressCancelLinkText,
  approveLinkText: state.options.addressApproveLinkText,
  showMoveInfo: state.info.addressHasMoveRequest,
  moveNote: state.info.addressHasMoveRequest ?
    Utils.format(
      state.options.addressMoveNote || '{0}',
      Utils.formatDate(
        state.info.addressMoveDate,
        DateFormats.DayNumberMonthWithTime
      )) :
    null,
  RelocationWidget: Relocation,
  needReloadPage: state.relocation.reloadPage === true
});

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),

    showRelocationDialog: () => dispatch(showRelocationDialog()),
    approve: () => {
      window.location = state.urls.submitMovementUrl;
    },
    cancel: () => {
      window.location = state.urls.cancelMovementUrl;
    },
    reload: () => {
      window.location.reload();
    }
  });
}

export default connectAdvanced(selectorFactory)(Address);
