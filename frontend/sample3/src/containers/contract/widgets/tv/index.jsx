import { connectAdvanced } from 'react-redux';

import Tv from 'components/widgets/tv';

import { TOP_MENU_TV_ITEM_ID } from 'consts';

import { selectingMenuItem } from 'actions';

import {
  getSubscriptionsCountString,
  getChannelsCountString,
  getTv,
  getTvEquipmentsValueString
} from 'selectors/tv';

const mapStateToProps = state => ({
  title: state.options.tvTitle,
  icon: getTv(state).icon,
  addMoreChannelsText: state.options.addChannelsLinkText,
  addMoreEquipmentsText: state.options.addEquipmentsLinkText,
  channelsText: state.options.tvChannelsText,
  channelsValue: getChannelsCountString(state),
  subscriptionsText: state.options.tvSubscrptionsText,
  subscriptionsValue: getSubscriptionsCountString(state),
  devicesText: state.options.tvEquipmentsText,
  devicesValue: getTvEquipmentsValueString(state),
});

function selectorFactory(dispatch) {
  return state => ({
    ...mapStateToProps(state),
    titleClick() {
      dispatch(selectingMenuItem(TOP_MENU_TV_ITEM_ID));
    },

    channelsClick: () => {
      dispatch(selectingMenuItem(TOP_MENU_TV_ITEM_ID));
    },

    addMoreChannels: () => {
      dispatch(selectingMenuItem(TOP_MENU_TV_ITEM_ID));
    },

    addMoreEquipments: () => {
      window.location.href = state.urls.equipmentsUrl;
    }
  });
}

export default connectAdvanced(selectorFactory)(Tv);
