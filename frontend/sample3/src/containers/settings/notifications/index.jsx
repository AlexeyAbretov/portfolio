import React from 'react';
import AccountName from './accountName';
import NotificationEmail from './notificationEmail';
import NotificationPhone from './notificationPhone';
import HideAwaiter from './hideAwaiter';

const Notifications = () => (
  <div style={{ width: '694px' }}>
    <div className="content-main-block">
      <div className="middle">
        <div className="user-info">
          <AccountName />
          <div>
            <NotificationEmail />
            <NotificationPhone />
            <div className="awaiter-message" style={{ paddingTop: '10px' }}>
              <HideAwaiter />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Notifications;
