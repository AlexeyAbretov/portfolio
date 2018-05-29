/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import classNames from 'classnames/bind';

import Row from './row';

export default class ExpandableRow extends React.Component {
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
      ...data.css
    });

    const cells = columns.map((x, i) => {
      const val = data[x.alias];

      if (i === 0) {
        const h4Classes = classNames({
          opened: isOpen
        });

        return (<td key={`sub_folded_${x.alias}`}>
          <h4 className={h4Classes}>
            <span className="before" />
            <span className="dynamic" onClick={this.click}>{val}</span>
          </h4>
        </td>);
      }

      return <td key={`sub_folded_${x.alias}`}>{val}</td>;
    });

    let rows = [<tr className={classes} key={`sub_first_${data.id}`}>
      {cells}
    </tr>];

    const style = {
      border: '1px solid rgb(208, 200, 187)',
      display: isOpen ? 'block' : 'none'
    };

    const sRows = subRows.map(x => <Row data={x} columns={columns} key={`sub_${x.id}`} />);
    const sub = (<tr className="row-folded" key={`sub_folded_${data.id}`}>
      <td colSpan={columns.length}>
        <div className="folded" style={style}>
          <span className="before" />
          <table>
            {sRows}
          </table>
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
