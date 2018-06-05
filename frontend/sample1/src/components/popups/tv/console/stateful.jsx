import React from 'react';
import PropTypes from 'prop-types';

import Content from './content';

class TvConsoleStateful extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNoteShow: false,
      changes: []
    };
  }

  toggleNote = () => {
    this.setState(prevState => ({
      isNoteShow: !prevState.isNoteShow
    }));
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
      items
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

    const props = {
      ...this.props,
      save: this.save,
      items: list,
      toggleNote: this.toggleNote,
      change: this.change,
      isNoteShow: this.state.isNoteShow
    };

    return (
      <Content
        {...props}
      />
    );
  }
}

TvConsoleStateful.propTypes = {
  isShow: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string
  }))
};

TvConsoleStateful.defaultProps = {
  isShow: false,
  items: []
};

export default TvConsoleStateful;
