import React from 'react';
import { storiesOf } from '@storybook/react';

import App from '../src/components/app';

storiesOf('App', module)
  .add('no title', () => (
    <App />
  ))
  .add('with title', () => (
    <App title="I'm App!!!" />
  ));
