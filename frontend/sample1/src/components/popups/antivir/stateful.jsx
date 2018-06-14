import React from 'react';
import PropTypes from 'prop-types';

import {
  ServiceTypes
} from 'consts';

import Content from './content';

const getNoteState = (props = {}, state = {}, list = []) => {
  if (!state.selected) {
    return {};
  }

  if (props.mappedItem &&
    state.selected !== props.mappedItem) {
    return {
      selectionNote: props.mappedSelectionNote,
      isShowSelectionNote: true
    };
  }

  const isDiffGroups = state.group !== ((props.groups || [])
    .find(x => x.selected) || {}).code;
  const isSelectedItemExists = !!list
    .find(x => x.id === state.selected);
  const isShowSelectionNote = state.selected &&
    isDiffGroups === isSelectedItemExists;

  const selectionNote = props.selectionNote;

  return {
    selectionNote,
    isShowSelectionNote
  };
};
class AntivirStateful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: ((props.items || [])
        .find(x => x.connected) || {}).id,
      opened: [],
      group: ((props.groups || [])
        .find(x => x.selected) || {}).code,
      email: ''
    };
  }

  onGroupChange = (code) => {
    this.setState({
      group: code
    });
  }

  onEmailChange = (value) => {
    this.setState({
      email: value
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

  save = () => {
    if (this.state.selected) {
      this.props.save(
        this.state.selected
      );
    }
  }

  toggleNote = (id) => {
    this.setState((prevState) => {
      if (!prevState.opened.includes(id)) {
        return {
          opened: [
            id,
            ...prevState.opened
          ]
        };
      }

      return {
        opened: [
          ...prevState.opened.filter(x => x !== id)
        ]
      };
    });
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

    const list = (items || [])
      .map(x => ({
        ...x,
        connected: this.state.selected === x.id
      }))
      .filter(x => x.type === this.state.group);

    const buttonTitle = this.state.selected === ((items || [])
      .find(x => x.connected) || {}).id ?
        continueTitle :
        addTitle;

    const { selectionNote, isShowSelectionNote } = getNoteState(
      this.props,
      this.state,
      list);

    const props = {
      ...this.props,
      groups: this.state.group ? (this.props.groups || []).map(x => ({
        ...x,
        selected: x.code === this.state.group
      })) : this.props.groups,
      save: !this.state.selected ?
        this.props.onClose :
        this.save,
      items: list,
      change: this.change,
      cancel: this.props.onClose,
      buttonTitle,
      toggleNote: this.toggleNote,
      dispayNotes: this.state.opened,
      onGroupChange: this.onGroupChange,
      isShowSelectionNote,
      selectionNote: (selectionNote || '')
        .replace(
          '{0}',
          (items
            .find(x => x.id === this.state.selected) || {}).name),
      isEmailShow: (items
        .find(x => x.id === this.state.selected) || {}).type === ServiceTypes.Eset &&
        this.state.selected !== this.props.mappedItem,
      isButtonDisabled: (items
        .find(x => x.id === this.state.selected) || {}).type === ServiceTypes.Eset &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email || ''),
      onEmailChange: this.onEmailChange
    };

    return (
      <Content
        {...props}
      />
    );
  }
}

AntivirStateful.propTypes = {
  isShow: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string,
    type: PropTypes.number,
    licenses: PropTypes.string,
    description: PropTypes.string
  })),
  addTitle: PropTypes.string,
  continueTitle: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool
  })),
  mappedSelectionNote: PropTypes.string,
  mappedItem: PropTypes.string
};

AntivirStateful.defaultProps = {
  isShow: false,
  items: [],
  addTitle: '',
  continueTitle: '',
  groups: [],
  mappedSelectionNote: '',
  mappedItem: null
};

export default AntivirStateful;
