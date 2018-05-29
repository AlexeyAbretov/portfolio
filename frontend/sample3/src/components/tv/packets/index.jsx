import React from 'react';
import PropTypes from 'prop-types';

import Group from './group';

const Packages = (props) => {
  const {
      items,
      saveText,
      change,
      showPopup,
      hasChanges
    } = props;

  const groups = items
    .map((x, index) => (<Group
      key={x.id}
      title={x.name}
      items={x.items}
      saveText={saveText}
      change={change}
      showPopup={showPopup}
      saveButtonShow={index === 0 && hasChanges}
    />));

  return groups;
};

Packages.propTypes = {
  saveText: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        channels: PropTypes.string,
        feeText: PropTypes.string,
        connected: PropTypes.bool,
        change: PropTypes.bool
      })
    )
  })),
  change: PropTypes.func,
  showPopup: PropTypes.func,
  hasChanges: PropTypes.bool
};

Packages.defaultProps = {
  saveText: 'Сохранить',
  items: [],
  change: () => {},
  showPopup: () => {},
  hasChanges: false
};

export default Packages;
