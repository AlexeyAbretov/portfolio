import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'components/vendor-ui';

export const TooltipPosition = {
  left: 'left',
  right: 'right',
  center: 'center'
};

const VendorTooltip = (props) => {
  const { position, width } = props;

  return (
    <Tooltip position={position} width={width}>
      {props.children}
    </Tooltip>
  );
};

VendorTooltip.propTypes = {
  position: PropTypes.oneOf([
    TooltipPosition.left,
    TooltipPosition.center,
    TooltipPosition.right]),
};

VendorTooltip.defaultProps = {
  position: TooltipPosition.left
};

export default VendorTooltip;
