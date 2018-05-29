import ReactDOM from 'react-dom';
import React from 'react';

import Entry from './entry';
import data from './data/fake';

ReactDOM.render(
  <Entry {...data} />,
  document.getElementById('root')
);
