/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["el", "e"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'react-html-parser';
import classNames from 'classnames/bind';

import styles from '../styles.css';
import commonStyles from '../../styles.css';

const cx = classNames.bind(styles);

class Legal extends React.Component {
  constructor(props) {
    super(props);
    const display = typeof window !== 'undefined' && window.innerWidth > 768 ?
            'desktop' :
            'adaptive';
    this.handleClick = this.handleClick.bind(this);
    this.state = { activeTab: 't0', display, openedDropdown: 'none' };
  }
  componentDidMount() {
    const resize = () => {
      const display = window.innerWidth > 768 ? 'desktop' : 'adaptive';
      this.setState({ display });
    };
    window.addEventListener('resize', resize, false);
  }
  handleClick(e) {
    if (this.state.display === 'desktop') {
      this.setState({
        activeTab: e.target.id
      });
    } else if (this.state.openedDropdown === e.target.id) {
      this.setState({ openedDropdown: 'none' });
    } else {
      this.setState({ openedDropdown: e.target.id });
      const maxHeight = `${document.getElementById(`${e.target.id}`.replace('Head', '')).offsetHeight + 61}px`;
      e.target.closest('.catalog__popup-dropdown-js').style.maxHeight = maxHeight;
    }
  }

  render() {
    const { description, title, isShow } = this.props;

    if (!isShow) {
      return null;
    }

    const listBlocks = [];
    const tabBlocks = [];
    const dropdowns = [];
    const inlineStyles = [];
    const doc = Parser(description);
    if (doc.filter(x => x.key).length) {
      doc.filter(x => x.key).forEach((el, i) => {
        if (el.type === 'style') {
          inlineStyles.push(el);
        } else {
          const dropTitle = `dropHead${i.toString()}`;
          const dropContent = `drop${i.toString()}`;
          const listBblock = (
            <li
              key={i.toString()}
              className={cx('catalog__popup-menu-item-wrap')}
            >
              <span
                role="menuitem"
                tabIndex={0}
                id={`t${i.toString()}`}
                className={cx('catalog__popup-menu-item', {
                  'catalog__popup-menu-item--active': this.state.activeTab === `t${i.toString()}`
                })}
                onClick={this.handleClick}
              >{el.props['data-title']}</span>
            </li>
                    );
          const tabBlock = (
            <div
              key={i.toString()}
              className={cx('catalog__popup-tab', {
                'catalog__popup-tab--active': this.state.activeTab === `t${i.toString()}`
              })}
            >
              {el}
            </div>
                    );
          const dropdown = (
            <div
              className={cx('catalog__popup-dropdown', 'catalog__popup-dropdown-js', {
                'catalog__popup-dropdown--opened': this.state.openedDropdown === dropTitle
              })}
              key={i.toString()}
            >
              <div
                className={cx('catalog__popup-dropdown-title')}
                id={dropTitle}
                role="menuitem"
                tabIndex={0}
                onClick={this.handleClick}
              >
                {el.props['data-title']}
              </div>
              <div className={cx('catalog__popup-dropdown-cnt')} id={dropContent}>
                {el}
              </div>
            </div>
                    );
          listBlocks.push(listBblock);
          tabBlocks.push(tabBlock);
          dropdowns.push(dropdown);
        }
      });
    }
    const tabs = (
      <div className={cx('catalog__popup-tabs')}>
        <ul className={cx('catalog__popup-menu')}>
          {listBlocks}
        </ul>
        <div className={cx('catalog__popup-tabs-content')}>
          {tabBlocks}
        </div>
      </div>
        );
    const Dropdowns = (
      <div>
        {inlineStyles}
        <div>{dropdowns}</div>
      </div>
        );
    return (
      <div className={cx('catalog__popup-content')}>
        <h2 className={cx(commonStyles['vendor-shpd-home-catalog__title'])}>{Parser(title)}</h2>
        {this.state.display === 'desktop' ? tabs : Dropdowns }
      </div>
    );
  }
}

Legal.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  isShow: PropTypes.bool
};

Legal.defaultProps = {
  description: '',
  title: '',
  isShow: false
};

export default Legal;
