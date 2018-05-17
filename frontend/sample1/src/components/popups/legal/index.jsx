/* eslint jsx-a11y/no-static-element-interactions:0 */
/* eslint react/no-find-dom-node:0 */
/* eslint react/no-array-index-key:0 */
/* eslint no-plusplus:0 */
/* eslint react/self-closing-comp:0 */
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["el"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'react-html-parser';
import classNames from 'classnames/bind';

import Portal from 'components/portal';
import { Popup } from 'components/vendor-ui';

import styles from '../styles.css';

const cx = classNames.bind(styles);

class LegalPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: '0' };
  }

  handleClick = (e) => {
    this.setState({
      activeTab: e.target.id
    });

    console.log(e.target.id);
  }
  
  render() {
    const { description, title, isShow, onClose } = this.props;
    const listBlocks = [];
    const tabBlocks = [];
    const doc = Parser(description);
    if (doc.length) {
      doc.forEach((el, i) => {
        const listBblock = (
          <li
            role="menuitem"
            key={i.toString()}
            id={i.toString()}
            className={cx('catalog__popup-menu-item', {
              'catalog__popup-menu-item--active': this.state.activeTab === el.key.toString()
            })}
            onClick={this.handleClick}
          >{el.props['data-title']}</li>
        );
        const tabBlock = (
          <div
            key={i.toString()}
            className={cx('catalog__popup-tab', {
              'catalog__popup-tab--active': this.state.activeTab === el.key.toString()
            })}
          >
            {el}
          </div>
        );
        listBlocks.push(listBblock);
        tabBlocks.push(tabBlock);
      });
    }
    const popup = (
      <div className={cx('catalog__popup-content')}>
        <h2>{Parser(title)}</h2>
        <ul id="data-legal-popup-menu" className={cx('catalog__popup-menu')}>
          {listBlocks}
        </ul>
        <div id="data-legal-popup-dynamic-description">
          {tabBlocks}
        </div>
      </div>
    );

    return (
      <Portal>
        <Popup opened={isShow} onClose={onClose} className={cx('catalog__popup')} wide>
          {popup}
        </Popup>
      </Portal>
    );
  }
}

LegalPopup.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  isShow: PropTypes.bool,
  onClose: PropTypes.func
};

LegalPopup.defaultProps = {
  description: '',
  title: '',
  isShow: false,
  onClose: () => {}
};

export default LegalPopup;
