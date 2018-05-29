export default {
  immediatePayFromCustomerCard: sum =>
    (sum == null || sum === '' ?
      {} :
      { isSucceeded: true, result: true }),

  activatePromisePayment: () => (
    { isSucceeded: true, result: { isSucceeded: true } }),
};
