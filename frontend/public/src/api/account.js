import fetch from './fetch';

const update = (url, options) => {
  const baseUrl = '/api/home/account/';

  return fetch(`${baseUrl}${url}`, options);
};

export default {
  blockAccount: (from, to, login) => update(`blockaccount?from=${from}&to=${to}&login=${login}`),
  mobileBlockAccount: (ctn, from) => update(`mobileblockaccount?ctn=${ctn}&from=${from}`),
  linkByLoginPassword: (login, password, userType) =>
    update(`link?login=${login}&password=${password}&userType=${userType}`),
  createLinkRequest: (login, userType) => update(`createlinkrequest?login=${login}&userType=${userType}`),
  acceptRequest: linkedAccount => update(`acceptrequest?linkedAccount=${linkedAccount}`),
  rejectRequest: linkedAccount => update(`rejectrequest?linkedAccount=${linkedAccount}`),
  cancelRequest: linkedAccount => update(`cancelrequest?linkedAccount=${linkedAccount}`),
  acceptInvite: linkedAccount => update(`acceptinvite?linkedAccount=${linkedAccount}`),
  rejectInvite: linkedAccount => update(`rejectinvite?linkedAccount=${linkedAccount}`),
  cancelInvite: linkedAccount => update(`cancelinvite?linkedAccount=${linkedAccount}`),
  deleteSocialAccount: (socialId, socialName) => update('deletesocialaccount',
    {
      method: 'POST',
      body: {
        socialId,
        socialName
      }
    }),
  deleteAccount: (linkedLogin, isCurrentAccSlave) => update('deleteaccount',
    {
      method: 'POST',
      body: {
        linkedLogin,
        isCurrentAccSlave
      }
    }),
  enableRequestToLink: enable => update(`enablerequesttolink?enable=${enable}`),
  changeDefaultSsoLogin: (login, ctn) =>
    update(`changedefaultssologin?login=${login}${ctn == null ? '' : `&ctn=${ctn}`}`, { method: 'POST' }),
  changeManageIpTv: () => {
    const result = { isSucceeded: true };
    return new Promise((resolve) => { resolve(result); });
  },

  changeLogin: alias => update(`createalias?alias=${alias}`),
  changePassword: (userLogin, newPassword, oldPassword) => update('changepassword',
    {
      method: 'POST',
      body: {
        userLogin,
        newPassword,
        oldPassword
      }
    }),
  switchCtn: id =>
    update('switchctn',
      {
        method: 'POST',
        body: { id }
      }),

  createRelocationRequest: relocationRequestData =>
    update('createrelocationrequest', { method: 'POST', body: relocationRequestData }),
};
