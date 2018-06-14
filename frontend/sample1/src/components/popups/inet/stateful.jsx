import React from 'react';
import PropTypes from 'prop-types';

import {
  MappingState
} from 'consts';

import Content from './content';

class InetStateful extends React.Component {
  constructor(props) {
    super(props);

    const inet = (props.items || [])
      .find(x => x.connected) || {};
    this.state = {
      selected: inet.id,
      vsuOpened: [],
      selectedVsu: ((inet.vsu || [])
        .find(x => x.connected) || {}).id
    };
  }

  toggleSpeedChooser = (id) => {
    this.setState((prevState) => {
      if (!prevState.vsuOpened.includes(id)) {
        return {
          vsuOpened: [
            id,
            ...prevState.vsuOpened
          ]
        };
      }

      return {
        vsuOpened: [
          ...prevState.vsuOpened.filter(x => x !== id)
        ]
      };
    });
  }

  change = (id) => {
    this.setState((prevState) => {
      if (prevState.selected === id) {
        return {
          selected: null
        };
      }

      return {
        selected: id
      };
    });
  }

  changeSpeed = (inetId, vsuId) => {
    this.setState({
      selected: inetId,
      selectedVsu: vsuId
    });
  }

  save = () => {
    if (this.state.selected) {
      this.props.save(
        this.state.selected
      );
    }
  }

  render() {
    const {
      isShow,
      items,
      continueTitle,
      addTitle,
      support,
      connectedVsu,
      oncePriceChangeSpeedText,
      rubSymbol
    } = this.props;

    if (!isShow) {
      return null;
    }

    let list = (items || [])
      .map(x => ({
        ...x,
        connected: this.state.selected === x.id,
        vsu: (x.vsu || []).map(v => ({
          ...v,
          connected: v.id === this.state.selectedVsu,
          fee: x.feeText
        }))
      }))
      .filter(x => x.type === this.state.group);

    if (support) {
      list = [
        support,
        ...list
      ];
    }

    const buttonTitle = this.state.selected === ((items || [])
      .find(x => x.connected) || {}).id ?
        continueTitle :
        addTitle;

    const selectedVsu = ((list
      .find(x => x.connected) || {}).vsu || [])
        .find(x => x.connected) || {};

    let vsuFee = selectedVsu.vsuConnectFee;

    if (connectedVsu && connectedVsu.fee > selectedVsu.fee) {
      vsuFee = selectedVsu.vsuMoveUpFee;
    } else if (connectedVsu && connectedVsu.fee < selectedVsu.fee) {
      vsuFee = selectedVsu.vsuMoveDownFee;
    }

    const props = {
      ...this.props,
      save: !this.state.selected ?
        this.props.onClose :
        this.save,
      items: list,
      change: this.change,
      cancel: this.props.onClose,
      buttonTitle,
      toggleSpeedChooser: this.toggleSpeedChooser,
      dispaySpeedChooser: this.state.vsuOpened,
      changeSpeed: this.changeSpeed,
      oncePriceChangeSpeedText: selectedVsu.mappingState === MappingState.Change ||
        (selectedVsu.mappingState === MappingState.Select &&
          !!connectedVsu) ?
        '' :
        `${oncePriceChangeSpeedText} ${vsuFee} ${rubSymbol}`
    };

    return (
      <Content
        {...props}
      />
    );
  }
}

InetStateful.propTypes = {
  isShow: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string,
    description: PropTypes.string,
    mappingState: PropTypes.string
  })),
  support: PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string,
    description: PropTypes.string
  }),
  connectedVsu: PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string,
    description: PropTypes.string
  }),
  oncePriceChangeSpeedText: PropTypes.string,
  rubSymbol: PropTypes.string
};

InetStateful.defaultProps = {
  isShow: false,
  items: [],
  support: null,
  connectedVsu: null,
  oncePriceChangeSpeedText: null,
  rubSymbol: ''
};

export default InetStateful;
