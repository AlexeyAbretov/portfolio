import ReactDOM from 'react-dom';
import React from 'react';

import data from 'fakes/data';
import Entry from '.';

ReactDOM.render(
  <Entry {...data} />,
  document.getElementById('root')
);
