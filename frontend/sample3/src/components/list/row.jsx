import React from 'react';

import FreeRow from './freeRow';

export default (props) => {
  const row = <FreeRow {...props} />;

  return (
    <tbody>
      {row}
    </tbody>
  );
};
