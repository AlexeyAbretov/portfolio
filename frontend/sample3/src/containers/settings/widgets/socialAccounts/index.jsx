import React from 'react';
import { connect } from 'react-redux';
import FB from './fb';
import VK from './vk';

const mapStateToProps = () => ({
  title: 'Привяжите профили соцсетей, чтобы входить в кабинет без пароля.'
});

const SocialAccounts = props => (
  <div className="contact-details">
    <div className="content-main-block sso-private-data">
      <div className="middle">
        <div className="social-accounts-list">
          <h3>{props.title}</h3>
          <div className="block-padding sso-social-buttons">
            <FB />
            <VK />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default connect(
    mapStateToProps
)(SocialAccounts);
