import fetch from './fetch';

const update = (url, options) => {
  const baseUrl = '/api/home/payment/';

  return fetch(`${baseUrl}${url}`, options);
};

export default {
  payFromCard: sum => update(`payfromcard?sum=${sum}`),

  activatePromisePayment: () => update('activatepromisepayment'),
};
