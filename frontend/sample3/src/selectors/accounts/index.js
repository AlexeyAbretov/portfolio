import { createSelector } from 'reselect';

export const getAccounts = state => state.accounts || [];

export const getCurrentAccount = createSelector(
    [getAccounts],
    (accounts) => {
      let result = null;

      accounts.forEach((el) => {
        if (result) {
          return;
        }

        if (el.isActive) {
          result = el;
          return;
        }

        if (el.ctns && el.ctns.length) {
          el.ctns.forEach((sub) => {
            if (sub.isActive) {
              result = sub;
            }
          });
        }
      });

      return result;
    }
);
