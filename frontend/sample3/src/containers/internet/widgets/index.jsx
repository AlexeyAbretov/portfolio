import React from 'react';
import LayoutContent from 'components/layoutContent';
import Tariff from './internet';
import Services from './services';
import Devices from './devices';

const Widgets = () => (
  <LayoutContent>
    <Tariff />
    <Services />
    <Devices />
  </LayoutContent>
);

export default Widgets;
