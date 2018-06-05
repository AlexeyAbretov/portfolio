import { connect } from 'react-redux';

import App from 'components/app';

import {
  getNote,
  getInfoText,
  getTitle
 } from 'selectors/app';

const mapStateToProps = state => ({
  title: getTitle(state),
  infoText: getInfoText(state),
  note: getNote(state)
});

export default connect(
  mapStateToProps
)(App);
