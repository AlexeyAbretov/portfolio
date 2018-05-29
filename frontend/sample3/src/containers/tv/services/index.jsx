import { connect } from 'react-redux';

import Services from 'components/tv/services';

import {
  getPresetServices
} from 'selectors/presets';

const mapStateToProps = (state) => {
  const items = getPresetServices(state);
  return {
    title: state.options.additionalServicesTitle,
    items,
    isVisible: !!items.length
  };
};

export default connect(
    mapStateToProps
)(Services);
