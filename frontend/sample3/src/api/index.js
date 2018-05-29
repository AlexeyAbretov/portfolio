import ReadApi from './read';
import AccountApi from './account';
import NotificationApi from './notification';
import PaymentApi from './payment';
import ServicesApi from './services';

export default {
  ...ReadApi,
  ...AccountApi,
  ...NotificationApi,
  ...PaymentApi,
  ...ServicesApi
};
