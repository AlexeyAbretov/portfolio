export default {
  delete: () => ({ isSucceeded: true }),
  put: (model) => {
    console.log('api putNotifications', model);
    return { isSucceeded: true, result: model };
  },
  sendCode: (model) => {
    console.log('api sendNotificationComfirmCode', model);
    return { isSucceeded: true, result: model };
  },
  confirmCode: (model) => {
    console.log('api confirmNotificationChannelCode', model);
    return { isSucceeded: true, confirmStatus: true, type: 'SMS', meta: { code: 20021 }, result: model };
  },
};
