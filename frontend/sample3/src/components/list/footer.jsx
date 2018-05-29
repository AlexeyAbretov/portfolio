import React from 'react';

import Row from './freeRow';

export default (props) => {
  const { items, columns } = props;

  let rows = (items || []).map(x =>
    <Row data={x} columns={columns} key="footer" css={{ total: true }} />
  );

  rows = [<tr className="separator" key="separator">
    <td colSpan={columns.length} />
  </tr>].concat(rows);

  return (
    <tbody>
      {rows}
    </tbody>
  );
}
;
