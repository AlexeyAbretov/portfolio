import React from 'react';

import Popup from 'components/popups';

import Content from './stateful';

export default props =>
  (<Popup
    isShow={props.isShow}
    onClose={props.onClose}
  >
    <Content {...props} />
  </Popup>);
