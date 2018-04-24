import React from 'react';
import { connect } from 'react-redux';

import App from 'components/app';

import Grid from 'containers/grid';
import LegalPopup from 'containers/popups/legal';

import getNote from 'selectors/app';
import {
  getOptions
} from 'selectors';

const children = (<div>
  <Grid />
  <LegalPopup />
</div>);

const mapStateToProps = (state) => {
  const options = getOptions(state);

  return {
    title: options.title,
    infoText: options.infoText,
    note: getNote(state),
    children
  };
};

export default connect(
  mapStateToProps
)(App);
