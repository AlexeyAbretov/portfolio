import React from 'react';

export default class Portal extends React.Component {
  render() {
    let { container } = this.props;

    if (!container) {
      const doc = typeof document === 'undefined' ? {} : document;
      container = doc.body;
    }

    if (!container) {
      return null;
    }

    return ReactDOM.createPortal(
      this.props.children,
      container
    );
  }
}
