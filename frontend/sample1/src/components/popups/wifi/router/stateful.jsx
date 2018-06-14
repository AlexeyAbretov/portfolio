import React from 'react';
import PropTypes from 'prop-types';

import Content from './content';

class WifiRouterStateful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changes: [
        ...(props.items || [])
          .filter(x => x.connected)
          .map(x => x.id)
      ]
    };
  }

  change = (id) => {
    this.setState((prevState) => {
      if (!prevState.changes.includes(id)) {
        return {
          changes: [
            id
          ]
        };
      }

      const required = this.props.items
        .find(x => x.isRequired && !x.isMapped);
      if (required) {
        return {
          changes: [
            required.id
          ]
        };
      }

      return {
        changes: []
      };
    });
  }

  save = () => {
    if (this.state.changes.length) {
      this.props.save(
        this.state.changes
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
      const connected = this.state.changes.includes(x.id) || x.isMapped;

      return {
        ...x,
        connected,
        disabled: connected && (x.isRequired || x.isMapped)
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
