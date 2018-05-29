/* eslint react/prefer-stateless-function: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */

import React from 'react';
import classNames from 'classnames/bind';

export default class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.change = this.change.bind(this);

    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      isOpen: (this.props.isOpen || false),
      current: this.props.current
    };
  }

  componentDidMount() {
    if (document) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: (nextProps.isOpen || false),
      current: nextProps.current
    });
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  handleClickOutside(e) {
    if (this.select !== e.target) {
      this.setState({
        isOpen: false
      });
    }
  }

  click() {
    if (this.props.click) {
      this.props.click();
    }

    this.setState({
      isOpen: !this.state.isOpen,
      current: this.state.current
    });
  }

  change(e, selected) {
    e.stopPropagation();

    if (this.props.change) {
      this.props.change(selected);
    }

    this.setState({
      isOpen: !this.state.isOpen,
      current: selected
    });
  }

  render() {
    const { css, styles, toolbox, items, id, contentToolbox } = this.props;
    const { isOpen, current } = this.state;

    const classes = classNames({
      slct: true,
      active: isOpen,
      ...css
    });

    const selectClasses = classNames({
      select: true
    });

    const formSelectStyles = isOpen ? {
      zIndex: '50'
    } : null;

    const dropStyles = isOpen ? {
      display: 'block',
      minWidth: this.select.offsetWidth + 30
    } : null;

    const dropClasses = classNames({
      drop: true,
      'block-message': items.length <= 1
    });

    const change = this.change;
    const prepare = (x) => {
      const itemClasses = classNames({
        alone: items.length <= 1,
        active: x.name === current.name,
        ...x.css
      });
      const list = x.items && x.items.length ?
        <li className="dropdown-group" key={`${x.name}_1`}><ul>{x.items.map(prepare)}</ul></li> : null;

      return [<li className={itemClasses} key={x.name} onClick={e => change(e, x)}>
        <span>
          {x.name}
        </span>
        <span className="comment-italic text-overflow nickname-limited">
          {x.desc}
        </span>
      </li>, list];
    };
    const list = items.map(prepare);

    return (
      <div className="form-select" style={formSelectStyles} id={id}>
        <div
          className={selectClasses}
          onClick={this.click}
          ref={(elem) => { this.select = elem; }}
        >
          <span className={classes} style={styles}>
            <span>{current.name}</span>
            <span className="comment-italic text-overflow nickname-limited">
              &nbsp;{current.desc}
            </span>
          </span>
          <div className="drop-wrap">
            <div className={dropClasses} style={dropStyles}>
              <div className="dropdown-inner">
                <div className="dropdown-list-content">
                  <ul>{list}</ul>
                  {contentToolbox}
                </div>
                {toolbox}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
