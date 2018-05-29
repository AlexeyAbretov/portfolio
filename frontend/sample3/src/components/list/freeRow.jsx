import React from 'react';
import classNames from 'classnames/bind';

export default (props) => {
  const { data, columns, css } = props;

  const row = columns.map((x) => {
    const val = data[x.alias];

    return <td key={x.alias}>{val}</td>;
  });

  const classes = classNames({
    ...data.css,
    ...css
  });

  return (
    <tr className={classes}>
      {row}
    </tr>
  );
};
