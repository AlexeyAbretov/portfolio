import pay from './pay';
import activatePromisePayment from './activatePromisePayment';
import relocation from './relocation';

export default [
  pay(),
  activatePromisePayment(),
  relocation()
];
