import fetch from './fetch';

const update = (url, options) => {
  const baseUrl = '/api/home/services/';

  return fetch(`${baseUrl}${url}`, options);
};

const changeServices = data => update('change', { method: 'POST', body: data });

export default {
  addService: changeServices,
  changeTariff: changeServices,
  speedUp: changeServices,
  changeTvPackages: changeServices,
  changeTvTariff: changeServices
};
