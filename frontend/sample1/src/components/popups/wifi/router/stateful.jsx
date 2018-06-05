import React from 'react';
import PropTypes from 'prop-types';

import Content from './content';

class WifiRouterStateful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changes: []
    };
  }

  change = (id) => {
    this.setState((prevState) => {
      const index = prevState.changes
        .indexOf(id);
      if (index === -1) {
        return {
          changes: [
            id,
            ...prevState.changes
          ]
        };
      }

      return {
        changes: [
          ...prevState.changes.slice(0, index),
          ...prevState.changes.slice(index + 1)
        ]
      };
    });
  }

  save = () => {
    if (this.state.changes.length) {
      this.props.save(
        this.state.changes[0]
      );
    }
  }

  render() {
    const {
      isShow,
      items,
      continueTitle,
      addTitle
    } = this.props;

    if (!isShow) {
      return null;
    }

    const list = (items || []).map((x) => {
      let { connected, future } = x;

      future = this.state.changes.includes(x.id) ?
        !future :
        future;

      connected = this.state.changes.includes(x.id) ?
        !connected :
        connected;

      return {
        ...x,
        connected,
        future
      };
    });

    const buttonTitle = !this.state.changes.length ?
      continueTitle :
      addTitle;

    const props = {
      ...this.props,
      save: !this.state.changes.length ?
        this.props.onClose :
        this.save,
      items: list,
      change: this.change,
      cancel: this.props.onClose,
      buttonTitle
    };

    return (
      <Content
        {...props}
      />
    );
  }
}

WifiRouterStateful.propTypes = {
  isShow: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string,
    feeNote: PropTypes.string
  })),
  addTitle: PropTypes.string,
  continueTitle: PropTypes.string
};

WifiRouterStateful.defaultProps = {
  isShow: false,
  items: [],
  addTitle: '',
  continueTitle: ''
};

export default WifiRouterStateful;
