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
      if (!prevState.changes.includes(id)) {
        return {
          changes: [
            id,
            ...prevState.changes
          ]
        };
      }

      return {
        changes: [
          ...prevState.changes.filter(x => x !== id)
        ]
      };
    });
  }

  save = () => {
    // по факту isPreInclude,
    // ну и как факт компонент знает о доп. логике
    // !!! наверное лучше переделать на 2 списка: добавленные и удаленные !!!
    const defaultConsole = (this.props.items || [])
      .find(x => x.byDefault);
    if (this.state.changes.length || defaultConsole) {
      let changes = [
        ...this.state.changes
      ];

      if (defaultConsole && changes.includes(defaultConsole.id)) {
        changes = [
          ...changes.filter(x => x !== defaultConsole.id)
        ];
      } else if (defaultConsole && !changes.includes(defaultConsole.id)) {
        changes = [
          ...changes,
          defaultConsole.id
        ];
      }

      this.props.save(
        changes
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

    const list = (items || []).map(x => ({
      ...x,
      connected: this.state.changes.includes(x.id) ?
          !x.connected :
          x.connected
    }));

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
