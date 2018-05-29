import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Scrollbars } from 'react-custom-scrollbars';
import style from './style.css';

const cx = classNames.bind(style);

/* eslint-disable react/prefer-stateless-function */ // for custom scroll
class PhoneList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      homeAccount: PropTypes.bool,
      mobileAccount: PropTypes.bool,
      number: PropTypes.string,
      title: PropTypes.string,
      isActive: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.shape({
        homeAccount: PropTypes.bool,
        mobileAccount: PropTypes.bool,
        number: PropTypes.string,
        title: PropTypes.string,
        isActive: PropTypes.bool,
      })),
    })).isRequired,
    switchAccount: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    nested: PropTypes.bool,
  }

  static defaultProps = {
    width: 'auto',
    nested: false,
  }

  handleClick = id => () => {
    this.props.switchAccount(id);
  }

  renderList = () => {
    const { items, nested } = this.props;

    return (
      <ul className={cx('accounts-list', {
        'accounts-list--nested': nested,
      })}
      >
        {items.map(item =>
          (<li
            key={item.number}
            className={cx('accounts-list__item', {
              'accounts-list__item--mobile': item.mobileAccount,
              'accounts-list__item--home': item.homeAccount,
            })}
          >
            {item.items && item.items.length > 0 ? (
              <div>
                <div
                  className={cx('accounts-list__item-btn', {
                    'accounts-list__item-btn--active': item.isActive,
                  })}
                  onClick={this.handleClick(item.account)}
                  role="button"
                  tabIndex={0}
                >
                  <span className={cx('accounts-list__item-number')}>{item.number}</span>
                  {item.title &&
                    <span className={cx('accounts-list__item-title')}>{item.title}</span>
                  }
                </div>
                <PhoneList
                  items={item.items}
                  switchAccount={this.props.switchAccount}
                  nested
                />
              </div>
            ) : (
              <div
                className={cx('accounts-list__item-btn', {
                  'accounts-list__item-btn--active': item.isActive,
                })}
                onClick={this.handleClick(item.account)}
                role="button"
                tabIndex={0}
              >
                <span className={cx('accounts-list__item-number')}>{item.number}</span>
                {item.title &&
                  <span className={cx('accounts-list__item-title')}>{item.title}</span>
                }
              </div>
            )}
          </li>))}
      </ul>
    );
  }

  render() {
    const { items, width } = this.props;
    const maxItems = 15;
    const itemHeight = 41;

    if (items.length <= maxItems) {
      return this.renderList();
    }

    return (
      <Scrollbars
        style={{ width }}
        autoHeightMin={itemHeight * 15}
        autoHeight
        autoHide
      >
        {this.renderList()}
      </Scrollbars>
    );
  }
}

export default PhoneList;
