/* eslint class-methods-use-this:0 */
/* eslint jsx-a11y/label-has-for:0 */
/* eslint no-param-reassign: 0 */

import React from 'react';
import BaseList from './baseList';
import
  Button,
  { ButtonType } from '../button';
import Checkbox from '../checkbox';

export default class NoticeList extends BaseList {

  constructor(props) {
    super(props);

    this.onItemCheck = this.onItemCheck.bind(this);
    this.onMarkAsReadClick = this.onMarkAsReadClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onCheckedAll = this.onCheckedAll.bind(this);
    this.onSingleRemove = this.onSingleRemove.bind(this);

    this.state.checkedItems = {};
    this.state.checkedAll = false;
  }

  onItemCheck(id, checked) {
    const partialState = { checkedItems: this.state.checkedItems };
    if (checked) {
      partialState.checkedItems[id] = true;
    } else {
      partialState.checkedAll = false;
      delete partialState.checkedItems[id];
    }
    this.setState(partialState);
  }

  onCheckedAll() {
    const checkedAll = !this.state.checkedAll;
    if (checkedAll) {
      for (let i = 0; i < this.renderedItemsCount; i += 1) {
        this.state.checkedItems[this.props.children[i].props.id] = true;
      }
    } else {
      this.state.checkedItems = {};
    }
    this.setState({ checkedAll });
  }

  checkedItemsToArray() {
    return Object.keys(this.state.checkedItems);
  }

  onMarkAsReadClick() {
    this.props.onMarkAsRead(this.checkedItemsToArray());
  }

  onRemoveClick() {
    this.props.onRemove(this.checkedItemsToArray());
  }

  onSingleRemove(id) {
    this.props.onRemove([id]);
  }

  incRenderedPages(partialState) {
    partialState.checkedAll = false;
    return partialState;
  }

  renderChild(child) {
    return React.cloneElement(child, {
      onCheck: this.onItemCheck,
      checked: !!this.state.checkedItems[child.props.id],
      onRemove: this.onSingleRemove
    });
  }

  renderListContent(items) {
    const isButtonsDisabled = this.checkedItemsToArray().length === 0;
    let archive = null;
    if (!this.props.isArchive) {
      archive = (<span className="button sub label">
        <a href="?Arch=true" className="dynamic">Архив уведомлений</a>
      </span>);
    }

    return (<div className="list-notifications">
      <div className="managing-notifications">

        <div className="selection-column">
          <Checkbox checked={this.state.checkedAll} onChange={this.onCheckedAll} />
        </div>
        <div className="buttons-column">

          <Button
            text="Отметить как прочитанное"
            type={ButtonType.Gray}
            isDisabled={isButtonsDisabled}
            click={this.onMarkAsReadClick}
            hasIndent
          />

          <Button
            text="Удалить отмеченные"
            type={ButtonType.Gray}
            isDisabled={isButtonsDisabled}
            click={this.onRemoveClick}
            hasIndent
          />

          {archive}

        </div>


      </div>

      <div>{items}</div>
    </div>);
  }

}
