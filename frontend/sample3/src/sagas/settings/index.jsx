import watchSettingsMenu from './settingsMenu';
import addAccount from './addAccount';
import deleteAccount from './deleteAccount';
import changeDefaultSsoLogin from './changeDefaultSsoLogin';
import notifications from './notifications';
import credentials from './credentials';
import socialAccount from './socialAccount';
import manageIpTv from './manageIpTv';
import invites from './invites';
import request from './request';
import blockAccount from './blockAccount';
import enableRequestToLink from './enableRequestToLink';

export default [
  watchSettingsMenu(),
  addAccount(),
  deleteAccount(),
  changeDefaultSsoLogin(),
  notifications(),
  credentials(),
  socialAccount(),
  manageIpTv(),
  invites(),
  request(),
  blockAccount(),
  enableRequestToLink()
];
