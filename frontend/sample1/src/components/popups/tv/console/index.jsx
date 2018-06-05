import React from 'react';

import Popup from 'components/popups';

import Stateful from './stateful';

export default props =>
  (<Popup
    isShow={props.isShow}
    onClose={props.onClose}
  >
    <Stateful {...props} />
  </Popup>);
