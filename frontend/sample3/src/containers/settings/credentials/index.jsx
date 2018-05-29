import React from 'react';
import Login from './login';
import Password from './password';

const ManageCredentials = () => (
  <div>
    <div className="content-block common change-password cabinet-password change-login" style={{ width: '694px' }}>
      <Login />
      <Password />
    </div>
  </div>
);

export default ManageCredentials;
