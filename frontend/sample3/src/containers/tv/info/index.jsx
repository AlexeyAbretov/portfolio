import { connectAdvanced } from 'react-redux';

import Info from 'components/tv/info';

import {
  ActivityNames
} from 'consts';

import actions from 'symbiotes/activity';

import {
  getChannelsCountString,
  getTv,
  getTvFullFeeString,
  getTvFeeString
} from 'selectors/tv';

import {
  getAvailableTvTariffs
} from 'selectors/presets';

import {
  getOptions
} from 'selectors';

import {
  getToggleChangeBlockActivity
} from 'selectors/activity';

import ChangeBlock from './change';

const mapStateToProps = (state) => {
  const tv = getTv(state);
  const items = getAvailableTvTariffs(state);
  const options = getOptions(state);

  return {
    title: options.tvTitle,
    channels: getChannelsCountString(state),
    showTariffInfo: !!tv.id,
    tariffText: options.tariffText,
    name: tv.name,
    feeText: getTvFeeString(state),
    fullFeeText: getTvFullFeeString(state),
    changeLinkText: tv.id ?
      options.changeTariffLinkText :
      options.connectTariffLinkText,
    showChangeLink: (items || []).length > 0,
    changeLinkStatus: getToggleChangeBlockActivity(state).status,
    changeBlock: <ChangeBlock />
  };
};

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    toggleChangeBlock() {
      dispatch(actions.activity.start(
        ActivityNames.Tv.ToggleChangeBlock));
    }
  });
}

export default connectAdvanced(
  selectorFactory
)(Info);
