/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import classNames from 'classnames/bind';

export default class descriptionExpandableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.click = this.click.bind(this);
  }

  click() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { data, columns, subRows } = this.props;
    const { isOpen } = this.state;

    const classes = classNames({
      'b-next-folded-open': true,
      ...data.css
    });

    const cells = columns.map((x, i) => {
      const val = data[x.alias];

      if (i === 1) {
        return (<td key={`sub_folded_${x.alias}`}>
          <span className="dynamic-event" onClick={this.click}>
            {val}
          </span>
        </td>);
      }

      return <td key={`sub_folded_${x.alias}`}>{val}</td>;
    });

    let rows = [<tr className={classes} key={`sub_first_${data.id}`}>
      {cells}
    </tr>];

    const style = {
      display: isOpen ? 'block' : 'none'
    };

    const sRows = subRows
      .filter((x, i) => i === 0)
      .map(x => x.desc);
    const sub = (<tr className="row-folded nopaddinglr" key={`sub_folded_${data.id}`}>
      <td colSpan={columns.length}>
        <div className="block-folded relative" style={style}>
          <span className="before" />
          {sRows[0]}
        </div>
      </td>
    </tr>);

    rows = rows.concat([sub]);

    return (
      <tbody>
        {rows}
      </tbody>);
  }
}
