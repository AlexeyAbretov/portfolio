import React from 'react';
import Portal from 'components/portal';
import { Popup } from 'components/vendor-ui';

export default (props) => {
  const { isShow, onClose } = props;

  if (!isShow) {
    return null;
  }

  return (
    <Portal>
      <Popup opened={isShow} onClose={onClose} wide>
        {props.children}
      </Popup>
    </Portal>
  );
};
