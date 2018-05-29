/* eslint class-methods-use-this:0 */
import React from 'react';
import BaseList from './baseList';

export default class RequestList extends BaseList {

  renderListContent(items) {
    return (<div className="blocks-messages">
      { items }
    </div>);
  }

}
