import React from 'react';
import { connect } from 'react-redux';
import AddProfile from './addProfile';
import AccountList from './accountList';
import AllowAccess from './allowAccess';

const mapStateToProps = () => ({
});

const ProfileAccess = () => (
  <div className="management-contract">
    <AccountList />
    <AllowAccess />
    <AddProfile />
  </div>
);

export default connect(
  mapStateToProps
)(ProfileAccess);
