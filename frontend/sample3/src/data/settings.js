/* eslint indent: 0 */

export default {
  manageAccounts: [{
    block: {
      balanceData: {},
      blockInfo: {
        blockStartDate: null,
        maxBlockDays: 90
      },
      futureBlockInfo: {
        blockDate: null,
        requestId: 0
      },
      ctn: '0894934476',
      status: 0,
      isIpTvConsoleRent: false,
      isWiFiRent: false
    },
    ctn: '0894934476',
    isMobile: false,
    name: 'FTTB/0894934476',
    nickName: null,
    ssoLoginDefault: true,
    type: 'FTTB',
    alias: null
  }, {
    block: {
      balanceData: {},
      blockInfo: {
        blockStartDate: null,
        maxBlockDays: 90
      },
      futureBlockInfo: {
        blockDate: null,
        requestId: 0
      },
      ctn: '0894934476',
      status: 0,
      isIpTvConsoleRent: false,
      isWiFiRent: false
    },
    ctn: '0894979158',
    isMobile: false,
    name: 'FTTB/0894979158',
    nickName: null,
    ssoLoginDefault: false,
    type: 'FTTB'
  }],

  recommendations: [{
    login: 'FTTB/0894957335',
    userType: 3
  }, {
    login: 'FTTB/0894933224',
    userType: 3
  }, {
    login: 'FTTB/0894951064',
    userType: 3
  }],

  outgoingRequests: [{
    creationDate: '2017-09-26T17:02:12.000+0300',
    destinationName: 'FTTB/0894987129',
    initiatorName: 'FTTB/0894934476',
    ssoRequestID: 8166,
    type: 'REQUEST'
  }],

  incomingInvites: [{
    creationDate: null,
    destinationName: 'FTTB/2222222222',
    initiatorName: 'FTTB/2222222222',
    ssoRequestID: 9000,
    type: 'INVITE'
  }],

  profileAccess: {
    requestToLinkEnable: false,
    accounts: [],
    incomingRequests: null,
    outgoingInvites: null
  },

  sharedData: {
    timeShift: 0,
    currentClientServerTimeStamp: null,
    redirectLinks: [
        { key: 'ReconfigureConnection', code: 27, link: '' },
        { key: 'VkBalance', code: 23, link: '' },
        { key: 'FbBalance', code: 24, link: '' },
        { key: 'SocNetworkUrlFb', code: 16, link: '' },
        { key: 'SocNetworkUrlVk', code: 17, link: '' },
    ]
  },
  addAccountToCurrentAwaiter: {},
  createLinkRequestAwaiter: {},
  notificationProfile: {},
  manageIpTv: {}
};
