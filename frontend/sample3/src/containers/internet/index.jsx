/* eslint  react/prefer-stateless-function: 0 */
import React from 'react';
import { connect } from 'react-redux';
import {
  TOP_MENU_INTERNET_ITEM_ID
} from 'consts';
import Widgets from './widgets';

const mapStateToProps = state => ({
  isVisible: state.visibilityTopMenu === TOP_MENU_INTERNET_ITEM_ID
});

class Internet extends React.Component {
  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <Widgets />
    );
  }
}

export default connect(
    mapStateToProps
)(Internet);
