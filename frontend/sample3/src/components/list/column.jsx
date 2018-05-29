import React from 'react';

export default (props) => {
  const { title, width, content } = props;

  return (<th style={{ width }}>
    {content != null ? content : <small>{title}</small>}
  </th>);
}
;
