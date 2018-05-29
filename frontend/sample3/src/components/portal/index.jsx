import React from 'react';

export default class Portal extends React.Component {
  render() {
    const doc = typeof document === 'undefined' ? {} : document;
    const body = doc.body;

    if (!body) {
      return null;
    }

    return ReactDOM.createPortal(
      this.props.children,
      body
    );
  }
}
