import React from 'react';

import Layout from 'components/layout';
import LayoutContent from 'components/layoutContent';
import Sidebar from 'components/sidebar';

import UserInfo from './account/info';
import Contract from './contract';
import Internet from './internet';
import Tv from './tv';
import Menu from './menu/side';
import Banner from './banner';

const MainPage = () => (
  <Layout>
    <Banner />
    <Sidebar>
      <UserInfo />
      <Menu />
    </Sidebar>
    <LayoutContent>
      <Contract />
      <Internet />
      <Tv />
    </LayoutContent>
  </Layout>
);

export default MainPage;
