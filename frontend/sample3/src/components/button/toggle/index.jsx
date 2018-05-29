/* eslint react/no-multi-comp: 0 */

import React from 'react';

import classNames from 'classnames/bind';

export class ToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    this.props.click(this.props.id);
  }

  render() {
    const { title, isActive } = this.props;

    let css = this.props.css;

    if (!css) {
      css = {};
    }

    const itemClass = classNames({
      active: isActive,
      ...css
    });

    const width = '42px';

    return (
      <li
        className={itemClass}
        style={{ width }}
        onClick={this.click}
        role="menuitem"
      >{title}</li>
    );
  }
}

export class ToggleButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };

    this.click = this.click.bind(this);
  }

  click(id) {
    this.setState({
      active: id
    });

    this.props.click(id);
  }

  render() {
    const { items } = this.props;
    const { active } = this.state;

    if (!items || !items.length) {
      return null;
    }

    const buttons = (items || []).map((x, i) =>
      (<ToggleButton
        id={x.id}
        title={x.title}
        click={this.click}
        css={i === 0 ? { first: true } : { second: true }}
        isActive={x.id === active}
        key={x.id}
      />)
    );

    return (
      <div className="toggle">
        <ul>
          {buttons}
        </ul>
      </div>
    );
  }
}
