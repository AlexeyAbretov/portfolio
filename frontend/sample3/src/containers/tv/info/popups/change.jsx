import { connectAdvanced } from 'react-redux';

import TvChangePopup from 'components/tv/info/popups/change';

import {
  getOptions
} from 'selectors';

import {
  getTvChangePopup,
  getPopupStatus
} from 'selectors/popups';

import {
  mapSelectedTvToPopupData,
  getNewFeeString
} from 'selectors/tv';

import {
  PopupsNames
} from 'consts';

import actions from 'symbiotes/popups';

import tvActions from 'symbiotes/tv';

const mapStateToProps = (state) => {
  const options = getOptions(state);

  return {
    title: options.tvChangeTariffPopupTitle,
    isShow: !!getTvChangePopup(state),
    note: options.tvChangeTariffPopupNote,
    okText: options.tvChangeTariffPopupOkText,
    success: options.tvChangeTariffResultTexts.success,
    fail: options.tvChangeTariffResultTexts.fail,
    status: getPopupStatus(state),
    tariff: mapSelectedTvToPopupData(state),
    newFeeText: getNewFeeString(state)
  };
};

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    close() {
      dispatch(actions.popups.close.start(
        PopupsNames.Tv.Change));
    },

    save() {
      dispatch(tvActions.tv.change.start());
    }
  });
}

export default connectAdvanced(
  selectorFactory
)(TvChangePopup);
