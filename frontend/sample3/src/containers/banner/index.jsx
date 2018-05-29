import { connect } from 'react-redux';

import Banner from 'components/bannerZone';

const mapStateToProps = state => ({
  content: state.options.banners
});

export default connect(
    mapStateToProps
)(Banner);
