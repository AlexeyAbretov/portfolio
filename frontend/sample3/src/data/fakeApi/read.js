import opHostory from '../op_history';
import payments from '../payments';
import servicesActivity from '../servicesActivity';
import discounts from '../discounts';
import internet from '../internet';
import calls from '../calls';
import notices from '../notices';
import requests from '../requests';
import turbo from '../turbo';
import settings from '../settings';
import socialAccounts from '../socialAccounts';
import requestDetails from '../requestDetails';
import streets from '../streets';
import houses from '../houses';
import accounts from '../accounts';
import preset from '../preset';
import presetTv1 from '../preset_tv1';
import presetTv2 from '../preset_tv2';

import state from './state';

export default {
  getOperationHistory: () => opHostory,
  getPayments: () => payments,
  getServicesActivity: () => servicesActivity,
  getInternetHistory: () => internet,
  getCallsHistory: () => calls,
  getDiscounts: () => discounts,
  getNoticesData: () => notices,
  getRequestsData: () => requests,
  getTurboButtonActivity: () => turbo,

  getAccounts: () => accounts,

  getRequestDetails: (requestId) => {
    requestDetails.requestId = requestId;
    return requestDetails;
  },
  getManagedAccounts: () => settings.manageAccounts,
  getProfileAccess: () => settings.profileAccess,
  getRecommendations: () => settings.recommendations,
  getOutgoingRequests: () => settings.outgoingRequests,
  getIncomingInvites: () => settings.incomingInvites,
  getSocialAccount: () => socialAccounts.accounts,
  getNotificationsSettings: () => settings.notificationProfile,
  getManageIpTv: () => settings.manageIpTv,
  getSharedData: () => settings.sharedData,
  getPreset: () => {
    let currentPreset = {
      ...preset
    };

    if (state.currentTv === 'tv1') {
      currentPreset = presetTv1;
    }

    if (state.currentTv === 'tv2') {
      currentPreset = presetTv2;
    }

    const packets = state.packets;
    if (packets.length) {
      currentPreset.tv = {
        ...currentPreset.tv,
        packages: currentPreset.tv.packages
          .map(x => ({
            ...x,
            connected: !!packets.find(f => f === x.id)
          }))
      };
    }

    state.setPackets([]);

    return currentPreset;
  },
  getStreets: term => streets.slice(0, streets.length - term.length),
  getHouses: (houseId, term) => houses.slice(0, houses.length - term.length),
};
