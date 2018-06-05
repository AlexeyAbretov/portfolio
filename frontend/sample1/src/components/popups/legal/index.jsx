import React from 'react';

import Popup from 'components/popups';

import Legal from './content';

export default props =>
  (<Popup
    isShow={props.isShow}
    onClose={props.onClose}
  >
    <Legal {...props} />
  </Popup>);
