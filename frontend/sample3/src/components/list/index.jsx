/* eslint react/prefer-stateless-function: 0 */
/* eslint react/no-multi-comp: 0 */

import PropTypes from 'prop-types';

import React from 'react';

import classNames from 'classnames/bind';

import Empty from './empty';
import Column from './column';
import Row from './row';
import ExpandableRow from './expandableRow';
import DescriptionExpandableRow from './descriptionExpandableRow';
import Footer from './footer';

export default class List extends React.Component {

  render() {
    const { items, columns, isVisible, isHideHeaderIfEmpty, footer } = this.props;

    if (!isVisible) {
      return null;
    }

    let css = this.props.css;
    if (!css) {
      css = {};
    }

    const header = (columns || []).map(x =>
      <Column {...x} key={x.alias} />
    );

    const body = (items || []).map((x) => {
      if (x.subRows && x.subRows.length) {
        if (x.type === 'desc') {
          return <DescriptionExpandableRow data={x} columns={columns} key={x.id} subRows={x.subRows} />;
        }

        return <ExpandableRow data={x} columns={columns} key={x.id} subRows={x.subRows} />;
      }

      return <Row data={x} columns={columns} key={x.id} />;
    });

    const classes = classNames({
      'table-content': true,
      'bg-white': true,
      ...css
    });

    const listFooter = footer ?
      <Footer items={footer} columns={columns} /> :
      null;

    return (
      <div>
        {body.length > 0 || (body.length === 0 && !isHideHeaderIfEmpty) ? <div className={classes}>
          <table>
            <tbody>
              <tr>
                {header}
              </tr>
            </tbody>
            {body}
            {listFooter}
          </table>
        </div> : null }
        {!items || !items.length ? <Empty /> : null}
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any),
  isVisible: PropTypes.bool,
  isHideHeaderIfEmpty: PropTypes.bool
};

List.defaultProps = {
  items: [],
  columns: [],
  isVisible: true,
  isHideHeaderIfEmpty: true
};
