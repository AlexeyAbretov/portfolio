import React from 'react';
import LayoutTiles from 'components/layoutTiles';
import Account from './account';
import Contacts from './contacts';
import Internet from './internet';
import Tv from './tv';
import Payment from './payment';
import Address from './address';

const Widgets = () => (
  <LayoutTiles>
    <Account />
    <Payment />
    <Internet />
    <Tv />
    <Contacts />
    <Address />
  </LayoutTiles>
);

export default Widgets;
