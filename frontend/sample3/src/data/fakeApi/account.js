import settings from '../settings';

export default {
  deleteSocialAccount(socialId, socialName) {
    if (socialId == null || socialName == null) {
      return {};
    }
    return { isSucceeded: true };
  },
  deleteAccount(linkedLogin) {
    if (linkedLogin == null) {
      return {};
    }
    return { isSucceeded: true };
  },
  changeDefaultSsoLogin(login) {
    if (login == null) {
      return {};
    }
    return { isSucceeded: true };
  },
  addAccountContact(contact) {
    if (contact == null) {
      return;
    }
    const account = settings.manageAccounts.find(x => x.ssoLoginDefault === true);
    if (!contact.contact) {
      account[contact.type] = null;
      account[`${contact.type}Enabled`] = false;
      account[`${contact.type}Confirmed`] = null;
    } else {
      account[contact.type] = contact.contact;
      account[`${contact.type}Enabled`] = contact.enabled;
      account[`${contact.type}Confirmed`] = contact.confirmed;
    }
  },
  confirmAccountContact(contact) {
    if (contact == null) {
      return;
    }
    const account = settings.manageAccounts.find(x => x.ssoLoginDefault === true);
    if (account[contact.type] === contact.contact) {
      account[`${contact.type}Confirmed`] = true;
    }
  },
  changeLogin(data) {
    if (data == null) {
      return {};
    }
    return {
      isSucceeded: true,
      result: true
    };
  },
  switchCtn: id => !!id,
  changePassword(data) {
    if (data == null) {
      return {};
    }
    return {
      isSucceeded: true,
      result: {
        meta: { status: 0, code: 0, codeValue: undefined, message: undefined },
        isSuccess: true
      }
    };
  },

  createRelocationRequest: () => ({ requestId: 1 }),
};
