import fetch from './fetch';

const get = (url, options) => {
  const baseUrl = '/api/profile/home/';

  return fetch(`${baseUrl}${url}`, options);
};

export default {
  getOperationHistory: (startDate, endDate) =>
    get(`operations?startDate=${startDate}&endDate=${endDate}`),
  getPayments: (startDate, endDate) =>
    get(`payments?startDate=${startDate}&endDate=${endDate}`),
  getServicesActivity: (startDate, endDate) =>
    get(`servicesactivity?startDate=${startDate}&endDate=${endDate}`),
  getTurboButtonActivity: (startDate, endDate) =>
    get(`turbobutton?startDate=${startDate}&endDate=${endDate}`),
  getDiscounts: (startDate, endDate) =>
    get(`discounts?startDate=${startDate}&endDate=${endDate}`),
  getInternetHistory: (startDate, endDate) =>
    get(`internet?startDate=${startDate}&endDate=${endDate}`),
  getCallsHistory: (startDate, endDate) =>
    get(`calls?startDate=${startDate}&endDate=${endDate}`),

  getAccounts: () => get('accounts'),
  getRequestsData: () => get('requests', { method: 'GET' }),
  getNoticesData: isArchive => get(`notices?isArchive=${isArchive}`, { method: 'GET' }),
  getRequestDetails: requestId => get(`requestinfo?requestId=${requestId}`, { method: 'GET' }),

  getManagedAccounts: () => get('managedaccounts', { method: 'GET' }),
  getProfileAccess: () => get('profileaccess', { method: 'GET' }),
  getRecommendations: () => get('recommendations', { method: 'GET' }),
  getOutgoingRequests: () => get('outgoingrequests', { method: 'GET' }),
  getIncomingInvites: () => get('incominginvites', { method: 'GET' }),
  getSocialAccount: () => get('socialaccounts', { method: 'GET' }),
  getNotificationsSettings: () => get('notificationssettings', { method: 'GET' }),
  getSharedData: () => get('shareddata', { method: 'GET' }),
  getLoginInfo: login => get(`logininfo?login=${login}`, { method: 'GET' }),
  getManageIpTv: () => get('managediptv', { method: 'GET' }),

  getStreets: term => get(`streets?term=${term}`, { method: 'GET' }),
  getHouses: (streetId, term) => get(`houses?streetId=${streetId}&term=${term}`, { method: 'GET' }),

  getPreset: () => get('preset', { method: 'GET' })
};
