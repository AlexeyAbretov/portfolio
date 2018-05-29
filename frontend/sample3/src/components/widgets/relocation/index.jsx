import React from 'react';
import RelocationWidget from './relocationWidget';

export default (props) => {
  if (props.isVisible) {
    return <RelocationWidget {...props} />;
  }
  return null;
};
