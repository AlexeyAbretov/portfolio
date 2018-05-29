import fetch from './fetch';

const update = (url, options) => {
  const baseUrl = '/api/home/notification/';

  return fetch(`${baseUrl}${url}`, options);
};

export default {
  read: ids => update('read', { method: 'POST', body: ids }),
  delete: ids => update('delete', { method: 'POST', body: ids }),
  put: notifications => update('put',
    { method: 'POST', body: notifications }),
  sendCode: channelType => update(`sendcode?type=${channelType}`),
  confirmCode: request =>
    update('confirmcode', { method: 'POST', body: request })
};
