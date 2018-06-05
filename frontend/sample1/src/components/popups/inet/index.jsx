import React from 'react';

import Popup from 'components/popups';

import Content from './content';

export default props =>
  (<Popup
    isShow={props.isShow}
    onClose={props.onClose}
  >
    <Content {...props} />
  </Popup>);
