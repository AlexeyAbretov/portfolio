import { combineReducers } from 'redux';

import {
  visibilityTopMenu,
  visibilityDetailsMenu,
  visibilitySettingsMenu,
  visibilityAccountsMenu
} from './menus';

import operationHistory from './details/operations';
import paymentHistory from './details/payments';
import servicesHistory from './details/services';
import turboButtonHistory from './details/turbo';
import discountsHistory from './details/discounts';
import internetHistory from './details/internet';
import callsHistory from './details/calls';

import detailsFilter from './details/filter';

import routing from './routing';
import messages from './messages';
import notices from './messages/notices';
import requests from './messages/requests';

import settings from './settings';
import notification from './settings/notification';
import credentials from './settings/credentials';
import socialAccounts from './settings/socialAccounts';
import manageIpTv from './settings/manageIpTv';
import sharedData from './settings/sharedData';

import preset from './contract/preset';
import pay from './contract/pay';
import activatePromisePayment from './contract/activatePromisePayment';
import addService from './internet/addService';
import changeTariff from './internet/changeTariff';
import speedUp from './internet/speedUp';
import relocation from './contract/relocation';

import popups from './popups';
import activity from './activity';
import changes from './changes';

const $id = (state = '') => state;

export default combineReducers({
  $id,

  info: (state = {}) => state,

  urls: (state = { baseUrl: '' }) => state,
  options: (state = {}) => state,
  payment: (state = {}) => state,

  accounts: (state = []) => [...state],

  visibilityDetailsMenu,
  visibilityTopMenu,
  visibilitySettingsMenu,
  visibilityAccountsMenu,

  operationHistory,
  paymentHistory,
  servicesHistory,
  discountsHistory,
  internetHistory,
  turboButtonHistory,
  callsHistory,

  routing,
  messages,
  notices,
  requests,
  settings,
  notification,
  credentials,
  socialAccounts,
  manageIpTv,
  sharedData,
  detailsFilter,
  unreadedNotificationCount: (state = 0) => state,

  preset,
  pay,
  activatePromisePayment,
  addService,
  changeTariff,
  speedUp,
  relocation,

  popups,
  activity,
  changes
});
