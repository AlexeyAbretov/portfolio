/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import CheckboxWithLabel from 'components/checkbox/withLabel';

export default (props) => {
  const checkboxes = props.items.map(item => (<div key={item.text} className="col">
    <CheckboxWithLabel
      onChange={eventData => props.onChange(item, eventData)}
      text={item.text}
      value={item.value}
      checked={item.checked}
    />
  </div>));

  return (
    <div className="calculator tab-switcher-content checks">
      <div className="active">
        <div className="tab-switcher__container">
          {checkboxes}
        </div>
      </div>
    </div>
  );
};

