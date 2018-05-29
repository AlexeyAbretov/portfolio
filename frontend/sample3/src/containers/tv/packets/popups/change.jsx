import { connectAdvanced } from 'react-redux';

import TvPacketsChangePopup from 'components/tv/packets/popups/change';

import {
    getTvPackagesChangePopup,
    getPopupStatus
} from 'selectors/popups';

import {
  getOptions
} from 'selectors';

import {
  getTvFullFeeString
} from 'selectors/tv';

import getChangedPackets from 'selectors/tv/packets';

import {
  PopupsNames
} from 'consts';

import actions from 'symbiotes/popups';

import tvActions from 'symbiotes/tv';

const mapStateToProps = (state) => {
  const options = getOptions(state);

  return {
    isShow: !!getTvPackagesChangePopup(state),
    title: options.tvChangePackagesPopupTitle,
    note: options.tvChangePackagesPopupNote,
    okText: options.tvChangePackagesPopupOkText,
    success: options.tvChangePackagesResultTexts.success,
    fail: options.tvChangePackagesResultTexts.fail,
    status: getPopupStatus(state),
    fullFee: getTvFullFeeString(state),
    items: getChangedPackets(state)
  };
};

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    close() {
      dispatch(actions.popups.close.start(
        PopupsNames.Tv.Packages.Change));
    },

    save() {
      dispatch(tvActions.tv.packages.change.start());
    }
  });
}

export default connectAdvanced(
  selectorFactory
)(TvPacketsChangePopup);
