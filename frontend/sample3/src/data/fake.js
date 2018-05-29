import info from './info';
import notices from './notices';
import requests from './requests';
import settings from './settings';
import accounts from './accounts';
import preset from './preset';
import options from './options';
import notification from './notifications';

export default {
  info,
  notices,
  requests,
  settings,
  accounts,
  urls: {
    baseUrl: '/',
    currentPresetUrl: 'http://localhost:81/moskva/customers/products/home/catalog/',
    catalogUrl: 'http://localhost:81/moskva/customers/products/home/catalog/',
    equipmentsUrl: 'http://localhost:81/moskva/customers/products/home/equipments/',
    submitMovementUrl: '',
    cancelMovementUrl: ''
  },
  preset,
  options,

  payment: {
    sum: 0
  },
  notification
}
;
