import { connect } from 'react-redux';

import App from 'src/components/app';

import getProps from 'src/selectors/app';

const mapStateToProps = state => ({
  ...getProps(state)
});

export default connect(
  mapStateToProps
)(App);
