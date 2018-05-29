import React from 'react';
import AccountList from './accountList';
import AddNewAccount from './addNewAccount';

const ManageAccounts = () => (
  <div>
    <div className="content-main-block" style={{ width: '694px' }}>
      <div className="middle">
        <AccountList />
        <AddNewAccount />
      </div>
    </div>
  </div>
);

export default ManageAccounts;
