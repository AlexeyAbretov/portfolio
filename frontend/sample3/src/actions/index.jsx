import { createAction } from 'redux-actions';

import {
  GET_OPERATION_HISTORY,
  GET_PAYMENT_HISTORY,
  GET_SERVICES_ACTIVITY_HISTORY,
  GET_DISCOUNTS_HISTORY,
  GET_TURBO_BUTTON_HISTORY,
  GET_INTERNET_HISTORY,
  GET_CALLS_HISTORY,

  TOGGLE_BLOCKING_LINK,
  TOGGLE_BLOCKING_DESCRIPTION,
  SET_NOTICES,
  SET_REQUESTS,
  SET_NAVIGATION_STATE,
  MESSAGES_MENU_ITEM_SELECTED,
  MESSAGES_MENU_ITEM_SELECTING,
  SET_DETAILS_FILTER,

  GET_SOCIAL_ACCOUNTS,
  GET_MANAGE_NUMBERS,
  GET_MANAGE_CREDENTIALS,
  GET_MANAGE_IP_TV,
  GET_SHARED_DATA,
  ADD_ACCOUNT_TO_CURRENT,
  ADD_ACCOUNT_TO_CURRENT_AWAITER,
  CREATE_LINK_REQUEST,
  CREATE_LINK_REQUEST_AWAITER,
  UPDATE_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS_AWAITER,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  GET_LOGIN_INFO,
  GET_LOGIN_INFO_AWAITER,
  BLOCK_ACCOUNT,
  BLOCK_ACCOUNT_AWAITER,
  CHANGE_DEFAULT_SSO_LOGIN,
  CHANGE_DEFAULT_SSO_LOGIN_SUCCESS,
  ACCEPT_REQUEST,
  ACCEPT_REQUEST_AWAITER,
  REJECT_REQUEST,
  REJECT_REQUEST_AWAITER,
  CANCEL_REQUEST,
  CANCEL_REQUEST_AWAITER,
  ACCEPT_INVITE,
  ACCEPT_INVITE_AWAITER,
  REJECT_INVITE,
  REJECT_INVITE_AWAITER,
  CANCEL_INVITE,
  CANCEL_INVITE_AWAITER,
  ADD_ACCOUNT_CONTACT,
  CONFIRM_NOTIFICATION_CODE,
  CONFIRM_NOTIFICATION_CODE_AWAITER,
  CONFIRM_NOTIFICATION_CODE_RESET_AWAITER,
  SEND_NOTIFICATION_CONFIRM_CODE,
  SEND_NOTIFICATION_CONFIRM_CODE_AWAITER,
  SEND_NOTIFICATION_CONFIRM_CODE_RESET_AWAITER,
  NOTIFICATIONS_HIDEAWAITER_TOGGLE,
  CHANGE_MANAGE_IP_TV,
  CHANGE_MANAGE_IP_TV_AWAITER,
  CHANGE_LOGIN,
  CHANGE_LOGIN_AWAITER,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_AWAITER,
  DELETE_SOCIAL_ACCOUNT,
  DELETE_SOCIAL_ACCOUNT_AWAITER,
  ENABLE_REQUEST_TO_LINK,
  ENABLE_REQUEST_TO_LINK_SUCCESS,

  CLOSE_MOVE_TICKET_NOTE,
  SHOW_BLOCKING_ACTIONS,
  CLOSE_COLLECTION_NOTIFICATIONS,
  MARK_NOTICES_AS_READ_REQUESTED,
  MARKED_NOTICES_AS_READ,
  DELETE_NOTICES_REQUESTED,

  HIDE_MOVE_REQUEST,
  TOGGLE_MOVE_REQUEST_AGREE,
  HIDE_REISSUE_REQUEST,
  REQUEST_DETAILS_REQUESTED,
  SET_REQUEST_DETAILS,

  SWITCH_ACCOUNT,
  DELETE_NOTICES,

  IMMEDIATE_PAY_FROM_CUSTOMER_CARD,
  IMMEDIATE_PAY_FROM_CUSTOMER_CARD_AWAITER,
  IMMEDIATE_PAY_FROM_CUSTOMER_CARD_RESET_AWAITER,
  ACTIVATE_PROMISE_PAYMENT,
  ACTIVATE_PROMISE_PAYMENT_AWAITER,
  ACTIVATE_PROMISE_PAYMENT_RESET_AWAITER,

  SHOW_RELOCATION_DIALOG,
  CLOSE_RELOCATION_DIALOG,
  FETCH_STREETS,
  FETCH_STREETS_SUCCESS,
  FETCH_HOUSES,
  FETCH_HOUSES_SUCCESS,
  CREATE_RELOCATION_REQUEST,
  CREATE_RELOCATION_REQUEST_FAIL,
} from 'consts';

export const selectingMenuItem = createAction(
  'MENU_ITEM_SELECTING');

export const selectMenuItem = createAction(
  'MENU_ITEM_SELECTED');

export const selectingDetailsMenuItem = createAction(
  'DETAILS_MENU_ITEM_SELECTING');

export const selectDetailsMenuItem = createAction(
  'DETAILS_MENU_ITEM_SELECTED');

export const selectingSettingsMenuItem = createAction(
  'SETTINGS_MENU_ITEM_SELECTING');

export const selectSettingsMenuItem = createAction(
  'SETTINGS_MENU_ITEM_SELECTED');

export const toggleAccountsMenu = createAction('ACCOUNTS_MENU_TOGGLE');

export function getOperationHistory(data) {
  return {
    type: GET_OPERATION_HISTORY,
    data
  };
}

export function getPaymentHistory(data) {
  return {
    type: GET_PAYMENT_HISTORY,
    data
  };
}

export function getServicesHistory(data) {
  return {
    type: GET_SERVICES_ACTIVITY_HISTORY,
    data
  };
}

export function getDiscountsHistory(data) {
  return {
    type: GET_DISCOUNTS_HISTORY,
    data
  };
}

export function getTurboButtonActivity(data) {
  return {
    type: GET_TURBO_BUTTON_HISTORY,
    data
  };
}

export function getInternetHistory(data) {
  return {
    type: GET_INTERNET_HISTORY,
    data
  };
}

export function getCallsHistory(data) {
  return {
    type: GET_CALLS_HISTORY,
    data
  };
}

export function getSocialAccounts(data) {
  return {
    type: GET_SOCIAL_ACCOUNTS,
    data
  };
}

export function getManageNumbers(data) {
  return {
    type: GET_MANAGE_NUMBERS,
    data
  };
}

export const getNotificationsSettings = createAction(
  'GET_NOTIFICATIONS_SETTINGS');

export function getManageCredentials(data) {
  return {
    type: GET_MANAGE_CREDENTIALS,
    data
  };
}

export function getManageIpTv(data) {
  return {
    type: GET_MANAGE_IP_TV,
    data
  };
}

export function getSharedData(data) {
  return {
    type: GET_SHARED_DATA,
    data
  };
}

export function addAccountToCurrent(data) {
  return {
    type: ADD_ACCOUNT_TO_CURRENT,
    data
  };
}

export function addAccountToCurrentAwaiter(data) {
  return {
    type: ADD_ACCOUNT_TO_CURRENT_AWAITER,
    data
  };
}

export function createLinkRequest(data) {
  return {
    type: CREATE_LINK_REQUEST,
    data
  };
}

export function createLinkRequestAwaiter(data) {
  return {
    type: CREATE_LINK_REQUEST_AWAITER,
    data
  };
}

export function updateNotifications(data) {
  return {
    type: UPDATE_NOTIFICATIONS,
    data
  };
}

export function updateNotificationsAwaiter(data) {
  return {
    type: UPDATE_NOTIFICATIONS_AWAITER,
    data
  };
}

export function deleteAccount(data) {
  return {
    type: DELETE_ACCOUNT,
    data
  };
}

export function deleteAccountSuccess(data) {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    data
  };
}

export function getLoginInfo(data) {
  return {
    type: GET_LOGIN_INFO,
    data
  };
}

export function getLoginInfoAwaiter(data) {
  return {
    type: GET_LOGIN_INFO_AWAITER,
    data
  };
}

export function blockAccount(data) {
  return {
    type: BLOCK_ACCOUNT,
    data
  };
}

export function blockAccountAwaiter(data) {
  return {
    type: BLOCK_ACCOUNT_AWAITER,
    data
  };
}

export function changeDefaultSsoLogin(data) {
  return {
    type: CHANGE_DEFAULT_SSO_LOGIN,
    data
  };
}

export function changeDefaultSsoLoginSuccess(data) {
  return {
    type: CHANGE_DEFAULT_SSO_LOGIN_SUCCESS,
    data
  };
}

export function acceptRequest(data) {
  return {
    type: ACCEPT_REQUEST,
    data
  };
}

export function acceptRequestAwaiter(data) {
  return {
    type: ACCEPT_REQUEST_AWAITER,
    data
  };
}

export function rejectRequest(data) {
  return {
    type: REJECT_REQUEST,
    data
  };
}

export function rejectRequestAwaiter(data) {
  return {
    type: REJECT_REQUEST_AWAITER,
    data
  };
}

export function cancelRequest(data) {
  return {
    type: CANCEL_REQUEST,
    data
  };
}

export function cancelRequestAwaiter(data) {
  return {
    type: CANCEL_REQUEST_AWAITER,
    data
  };
}

export function acceptInvite(data) {
  return {
    type: ACCEPT_INVITE,
    data
  };
}

export function acceptInviteAwaiter(data) {
  return {
    type: ACCEPT_INVITE_AWAITER,
    data
  };
}

export function rejectInvite(data) {
  return {
    type: REJECT_INVITE,
    data
  };
}

export function rejectInviteAwaiter(data) {
  return {
    type: REJECT_INVITE_AWAITER,
    data
  };
}

export function cancelInvite(data) {
  return {
    type: CANCEL_INVITE,
    data
  };
}

export function cancelInviteAwaiter(data) {
  return {
    type: CANCEL_INVITE_AWAITER,
    data
  };
}

export function addAccountContact(data) {
  return {
    type: ADD_ACCOUNT_CONTACT,
    data
  };
}

export function confirmNotificationCode(data) {
  return {
    type: CONFIRM_NOTIFICATION_CODE,
    data
  };
}

export function confirmNotificationCodeAwaiter(data) {
  return {
    type: CONFIRM_NOTIFICATION_CODE_AWAITER,
    data
  };
}

export function confirmNotificationCodeResetAwaiter(data) {
  return {
    type: CONFIRM_NOTIFICATION_CODE_RESET_AWAITER,
    data
  };
}

export function sendNotificationConfirmCode(data) {
  return {
    type: SEND_NOTIFICATION_CONFIRM_CODE,
    data
  };
}

export function sendNotificationConfirmCodeAwaiter(data) {
  return {
    type: SEND_NOTIFICATION_CONFIRM_CODE_AWAITER,
    data
  };
}

export function sendNotificationConfirmCodeResetAwaiter(data) {
  return {
    type: SEND_NOTIFICATION_CONFIRM_CODE_RESET_AWAITER,
    data
  };
}

export function toggleNotificationHideAwaiter(data) {
  return {
    type: NOTIFICATIONS_HIDEAWAITER_TOGGLE,
    data
  };
}

export function changeManageIpTv(data) {
  return {
    type: CHANGE_MANAGE_IP_TV,
    data
  };
}

export function changeManageIpTvAwaiter(data) {
  return {
    type: CHANGE_MANAGE_IP_TV_AWAITER,
    data
  };
}

export function changeLogin(data) {
  return {
    type: CHANGE_LOGIN,
    data
  };
}

export function changeLoginAwaiter(data) {
  return {
    type: CHANGE_LOGIN_AWAITER,
    data
  };
}

export function changePassword(data) {
  return {
    type: CHANGE_PASSWORD,
    data
  };
}

export function changePasswordAwaiter(data) {
  return {
    type: CHANGE_PASSWORD_AWAITER,
    data
  };
}

export function deleteSocialAccount(data) {
  return {
    type: DELETE_SOCIAL_ACCOUNT,
    data
  };
}

export function deleteSocialAccountAwaiter(data) {
  return {
    type: DELETE_SOCIAL_ACCOUNT_AWAITER,
    data
  };
}

export function enableRequestToLink(data) {
  return {
    type: ENABLE_REQUEST_TO_LINK,
    data
  };
}

export function enableRequestToLinkSuccess(data) {
  return {
    type: ENABLE_REQUEST_TO_LINK_SUCCESS,
    data
  };
}

export function ToggleBlockingLink() {
  return {
    type: TOGGLE_BLOCKING_LINK
  };
}

export function ToggleBlockingDescription() {
  return {
    type: TOGGLE_BLOCKING_DESCRIPTION
  };
}

export function setNotices(notices) {
  return {
    type: SET_NOTICES,
    notices
  };
}

export function setRequests(requests) {
  return {
    type: SET_REQUESTS,
    requests
  };
}

// redux-router
export function setNavigationState(args) {
  const { top, second, baseUrl, params } = args;
  return {
    type: SET_NAVIGATION_STATE,
    top,
    second,
    baseUrl,
    params
  };
}

export function selectedMessageMenuItem(id) {
  return {
    type: MESSAGES_MENU_ITEM_SELECTED,
    id
  };
}

export function selectingMessageMenuItem(id, params) {
  return {
    type: MESSAGES_MENU_ITEM_SELECTING,
    id,
    params
  };
}

export function setDetailsFilter(key, startDate, endDate) {
  return {
    type: SET_DETAILS_FILTER,
    key,
    startDate,
    endDate
  };
}

export function closeMoveTicketNote() {
  return {
    type: CLOSE_MOVE_TICKET_NOTE
  };
}

export function showBlockingActions() {
  return {
    type: SHOW_BLOCKING_ACTIONS
  };
}

export function closeCollectionNotifications() {
  return {
    type: CLOSE_COLLECTION_NOTIFICATIONS
  };
}

export function hideMoveRequest() {
  return {
    type: HIDE_MOVE_REQUEST
  };
}

export function toggleMoveRequestAgree() {
  return {
    type: TOGGLE_MOVE_REQUEST_AGREE
  };
}


export function hideReissueRequest() {
  return {
    type: HIDE_REISSUE_REQUEST
  };
}


export function MarkNoticesAsReadRequested(noticeIds) {
  return {
    type: MARK_NOTICES_AS_READ_REQUESTED,
    noticeIds
  };
}

export function MarkedNoticesAsRead(noticeIds) {
  return {
    type: MARKED_NOTICES_AS_READ,
    noticeIds
  };
}

export function DeleteNoticesRequested(noticeIds) {
  return {
    type: DELETE_NOTICES_REQUESTED,
    noticeIds
  };
}

export function deleteNotices(noticeIds) {
  return {
    type: DELETE_NOTICES,
    noticeIds
  };
}

export function RequestDetailsRequested(requestId) {
  return {
    type: REQUEST_DETAILS_REQUESTED,
    requestId
  };
}


export function SetRequestDetails(details) {
  return {
    type: SET_REQUEST_DETAILS,
    details
  };
}

export function switchAccount(id) {
  return {
    type: SWITCH_ACCOUNT,
    id
  };
}

export const getPreset = createAction(
  'GET_PRESET_DATA');

export const resetPreset = createAction(
  'RESET_PRESET_DATA');

export const immediatePayFromCustomerCard = createAction(
  IMMEDIATE_PAY_FROM_CUSTOMER_CARD);

export const immediatePayFromCustomerCardAwaiter = createAction(
  IMMEDIATE_PAY_FROM_CUSTOMER_CARD_AWAITER);

export const immediatePayFromCustomerCardResetAwaiter = createAction(
  IMMEDIATE_PAY_FROM_CUSTOMER_CARD_RESET_AWAITER);

export const activatePromisePayment = createAction(
  ACTIVATE_PROMISE_PAYMENT);

export const allPaymentTypes = createAction(
  'ALL_PAYMENTS_TYPES');

export const activatePromisePaymentAwaiter = createAction(
  ACTIVATE_PROMISE_PAYMENT_AWAITER);

export const activatePromisePaymentResetAwaiter = createAction(
  ACTIVATE_PROMISE_PAYMENT_RESET_AWAITER);

export const addService = createAction(
  'ADD_SERVICE');

export const addServiceAwaiter = createAction(
  'ADD_SERVICE_AWAITER');

export const addServiceResetAwaiter = createAction(
  'ADD_SERVICE_RESET_AWAITER');

export const changeTariff = createAction(
  'CHANGE_TARIFF');

export const changeTariffAwaiter = createAction(
  'CHANGE_TARIFF_AWAITER');

export const changeTariffResetAwaiter = createAction(
  'CHANGE_TARIFF_RESET_AWAITER');

export const speedUp = createAction(
  'SPEED_UP');

export const speedUpAwaiter = createAction(
  'SPEED_UP_AWAITER');

export const speedUpResetAwaiter = createAction(
  'SPEED_UP_RESET_AWAITER');

export const showRelocationDialog = createAction(
  SHOW_RELOCATION_DIALOG);

export const closeRelocationDialog = createAction(
  CLOSE_RELOCATION_DIALOG);

export const fetchStreets = createAction(
  FETCH_STREETS);

export const fetchStreetsSuccess = createAction(
  FETCH_STREETS_SUCCESS);

export const fetchHouses = createAction(
  FETCH_HOUSES);

export const fetchHousesSuccess = createAction(
  FETCH_HOUSES_SUCCESS);

export const createRelocationRequest = createAction(
  CREATE_RELOCATION_REQUEST);

export const createRelocationRequestFail = createAction(
  CREATE_RELOCATION_REQUEST_FAIL);
