/* eslint jsx-a11y/label-has-for: 0 */
/* eslint no-param-reassign: 0 */
/* eslint class-methods-use-this:0 */

import React from 'react';

import Utils from 'utils';

import CheckboxFilter from './checkboxFilter';

export default class BaseList extends React.Component {

  constructor(props) {
    super(props);
    this.onTermChange = this.onTermChange.bind(this);
    this.onFilterItemCheck = this.onFilterItemCheck.bind(this);
    this.onIncRenderedPages = this.onIncRenderedPages.bind(this);

    this.state = { term: '', renderedPages: 1 };

    this.state.filterItems = this.props.filterItems.map(elem => ({
      text: elem.text,
      value: elem.value,
      checked: true
    }));
  }

  onTermChange(e) {
    this.setState({
      term: e.target.value,
      renderedPages: 1
    });
  }

  onFilterItemCheck(item, eventData) {
    item.checked = eventData.checked;
    this.setState({ filterItems: this.state.filterItems });
  }


  onIncRenderedPages() {
    const partialState = this.incRenderedPages({ renderedPages: this.state.renderedPages + 1 });
    this.setState(partialState);
  }

  // override in child classes
  incRenderedPages(partialState) {
    return partialState;
  }

  isItemVisible(item) {
    if (this.toFilter(item)) {
      return false;
    }

    if (!this.state.term) {
      return true;
    }
    const str = (item.notificationId + item.title).toLowerCase();
    return str.indexOf(this.state.term) !== -1;
  }

  // true - элемент не надо показывать
  toFilter(item) {
    const filterItem = this
      .state
      .filterItems
      .find(fi => !fi.checked && item.filterTypes.some(filterType => filterType === fi.value));
    return !!filterItem;
  }

  renderListContent(/* items */) {
    throw new Error('implement this method in child');
  }

  renderChild(child) {
    // override in children class if you want to edit child props
    return child;
  }


  render() {
    const itemsPerPage = 10;
    const props = this.props;
    const state = this.state;

    let items = props.children
      .filter(x => this.isItemVisible(x.props))
      .map((c) => {
        const child = this.renderChild(c);
        return (<div key={child.key}> {child} </div>);
      });

    const totalItemsCount = items.length;
    this.renderedItemsCount = itemsPerPage * state.renderedPages;

    let showMoreCount = totalItemsCount - this.renderedItemsCount;

    if (showMoreCount > itemsPerPage) {
      showMoreCount = itemsPerPage;
    }

    let showMoreBtnStyle = null;
    if (this.renderedItemsCount >= totalItemsCount) {
      this.renderedItemsCount = totalItemsCount;
      showMoreBtnStyle = { display: 'none' };
    }

    items = items.slice(0, this.renderedItemsCount);

    const moreTitle = showMoreCount ? Utils.getPluralFormFormatted({
      rusFirstPlural: 'Показать следующее {0} сообщение',
      rusSecondPlural: 'Показать следующие {0} сообщения',
      rusThirdPlural: 'Показать следующие {0} сообщений',
    }, showMoreCount) : '';

    return (
      <div>
        <CheckboxFilter onChange={this.onFilterItemCheck} items={this.state.filterItems} />

        <div className="contents-messages">
          <div className="search-message">
            <span className="srch-icon" />
            <input
              type="text"
              value={this.state.term}
              onChange={this.onTermChange}
              placeholder="Тема сообщения или его ID"
            />
          </div>


          {this.renderListContent(items)}

          {showMoreCount ? <span
            style={showMoreBtnStyle}
            className="button sub label margin-14"
            role="button"
            tabIndex={0}
            onClick={this.onIncRenderedPages}
          >
            <label>{moreTitle}</label>
            <input type="button" value={moreTitle} />
          </span> : null}
        </div>
      </div>
    );
  }

}
