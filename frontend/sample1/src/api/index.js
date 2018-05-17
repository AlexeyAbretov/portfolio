import read from './read';
import accounts from './account';
import notifications from './notification';
import payments from './payment';
import services from './services';

export default {
  ...read,
  ...accounts,
  ...notifications,
  ...payments,
  ...services
};
