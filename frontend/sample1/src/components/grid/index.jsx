/* eslint no-param-reassign: ["error", { "props": false }] */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Parser from 'react-html-parser';

import Link from 'components/link/pseudo';
import Button from 'components/button';
import bind from 'components/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);
const RowType = {
  Link: 'Link',
  Inline: 'Inline'
};

const RowStatus = {
  Connected: 'Connected',
  Allow: 'Allow',
  Default: 'Default'
};

const btnClass = cx('catalog__tariff-btn');

const getItemData = ({ item, click, moreInfoClick, setupClick } = {}) => {
  const rows = (item.rows || [])
    .map((x) => {
      const inlineCss = {
        'catalog__tariff-service-text': x.status === RowStatus.Default || !item.status,
        'catalog__tariff-service-text--connected': x.status === RowStatus.Connected,
        'catalog__tariff-service-text--additional': x.status === RowStatus.Allow
      };

      return (<div
        key={x.key}
        className={cx('catalog__tariff-service', {
          // 'catalog__tariff-service--additional': x.type !== RowType.Link,
        })}
      >
        {x.type === RowType.Link ?
          (<span>
            {/* { (x.status === RowStatus.Connected || x.status === RowStatus.Allow) &&
              <span className={cx({
                'catalog__tariff-service-text--connected-cross': x.status === RowStatus.Connected,
                'catalog__tariff-service-text--additional-cross': x.status === RowStatus.Allow,
              })}
              >+</span>} */}
            <Link status={x.status} click={bind(click, [item.id, x.id, x.key])}>{x.value}</Link>
          </span>) :
          <span>
            {x.status === RowStatus.Default || !item.status ?
              <span className={cx(inlineCss)}>{Parser(x.value)}</span> :
              <span>
                {(x.status === RowStatus.Connected || x.status === RowStatus.Allow) &&
                  <span className={cx({
                    'catalog__tariff-service-text--connected-cross': x.status === RowStatus.Connected,
                    'catalog__tariff-service-text--additional-cross': x.status === RowStatus.Allow,
                  })}
                  >+</span>}
                <span className={cx(inlineCss)}>{Parser(x.value)}</span>
              </span>
            }
          </span>}
        {x.image && <img src={x.image} alt="" className={cx('catalog__tariff-service-img')} />}
      </div>);
    });

  const button = item.isConnected ?
    (<div className={cx('catalog__tariff-btn--connected')}>
      <span>{Parser(item.buttonTitle)}</span>
    </div>) :
    <Button className={btnClass}>{item.buttonTitle}</Button>;

  return (<div className={cx('catalog__tariff')} key={item.id}>
    <div className={cx('catalog__tariff-topwrap')}>
      <div className={cx('catalog__tariff-fee')}>
        {Parser(`${item.fee} ${item.feeUnit}`)}
      </div>
      <div className={cx('catalog__tariff-fee-text')}>
        {Parser(item.feePeriod)}
      </div>
      <div className={cx('catalog__tariff-services')}>{rows}</div>
    </div>
    <div className={cx('catalog__tariff-downwrap')}>
      <div className={cx('catalog__tariff-full-fee')}>{Parser(`${item.sum} ${item.sumUnit}`)}</div>
      <div className={cx('catalog__tariff-services-text')}>{Parser(item.additionalServicesText)}</div>
      <div className={cx('catalog__tariff-btn-container')}>{button}</div>
      <div>
        {item.setupText &&
          <Link className={cx('catalog__tariff-more-info')} click={bind(setupClick, [item.id])}>{item.setupText}</Link>}
        {item.setupText && <br />}
        <Link
          className={cx('catalog__tariff-more-info')}
          click={bind(moreInfoClick, [item.id])}
        >{item.moreInfoText}</Link>
      </div>
    </div>
  </div>);
};

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      translateTariffs: 0,
      nextDisabled: false,
      titleFixHeight: 'auto',
      maxTranslate: 0,
    };
    this.groupTitle = [];
    this.groupWrap = [];
    this.titleFixHeight = 'auto';
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ maxTranslate: this.wrap.offsetWidth - this.container.offsetWidth });
    }, 100);
    let titleFixHeight = 0;
    this.groupTitle.forEach((x, i) => {
      if (x.offsetWidth >= this.groupWrap[i].offsetWidth) {
        this.groupTitle[i].style.width = `${this.groupWrap[i].offsetWidth}px`;
        if (this.groupTitle[i].offsetHeight > titleFixHeight) {
          titleFixHeight = this.groupTitle[i].offsetHeight;
          this.setState({ titleFixHeight });
          // console.log(this.titleFixHeight);
        }
      }
    });

    const tariffsTopWraps = Array.from(document.querySelectorAll('.catalog__tariff-topwrap'));
    const tariffsDownWraps = Array.from(document.querySelectorAll('.catalog__tariff-downwrap'));
    let tariffsTopWrapsHeight = 0;
    let tariffsDownWrapsHeight = 0;
    tariffsTopWraps.forEach((x) => {
      if (x.offsetHeight > tariffsTopWrapsHeight) tariffsTopWrapsHeight = x.offsetHeight;
    });
    tariffsTopWraps.forEach((x) => {
      x.style.height = `${tariffsTopWrapsHeight}px`;
    });
    tariffsDownWraps.forEach((x) => {
      if (x.offsetHeight > tariffsDownWrapsHeight) tariffsDownWrapsHeight = x.offsetHeight;
    });
    tariffsDownWraps.forEach((x) => {
      x.style.height = `${tariffsDownWrapsHeight}px`;
    });
  }

  scroll = (e) => {
    if (!this.state.nextDisabled && e.target === this.next) {
      const translateTariffs = this.state.translateTariffs - 130;
      this.setState({
        translateTariffs,
        nextDisabled: translateTariffs <= this.state.maxTranslate
      });
    } else if (e.target === this.prev && this.state.translateTariffs < 0) {
      this.setState({
        nextDisabled: false,
        translateTariffs: this.state.translateTariffs + 130
      });
    }
  }

  render() {
    const { groups, items, click, moreInfoClick, setupClick } = this.props;
    const result = (groups || []).map((x, i) => {
      const subItems = (items[x.code] || [])
        .map(w => getItemData({ item: w, click, moreInfoClick, setupClick }));
      if (!subItems.length) {
        return null;
      }
      return (
        <div key={x.code} className={cx('catalog__tariffs-group')}>
          <div className={cx('catalog__tariffs-groupe-image')}><img src={x.image} alt="group-pic" /></div>
          <div
            className={cx('catalog__tariffs-groupe-title')}
            ref={(groupTitle) => { this.groupTitle[i] = groupTitle; }}
            style={{ height: this.state.titleFixHeight }}
          >
            <span className={cx('catalog__tariffs-groupe-title-text')}>{x.title}</span>
          </div>
          <div
            className={cx('grid-container')}
            ref={(groupWrap) => { this.groupWrap[i] = groupWrap; }}
          >{subItems}</div>
        </div>
      );
    });

    return (
      <div className={cx('catalog__tariffs-align')}>
        <div className={cx('catalog__tariffs-wrap')}>
          { this.state.maxTranslate < 0 &&
            <div className={cx('catalog__tariffs-arrows')}>
              <button
                className={cx('catalog__tariffs-arrow-prev', {
                  'catalog__tariffs-arrow--disabled': this.state.translateTariffs === 0,
                })}
                onClick={this.scroll}
                ref={(el) => { this.prev = el; }}
              >prevarious</button>
              <button
                className={cx('catalog__tariffs-arrow-next', {
                  'catalog__tariffs-arrow--disabled': this.state.nextDisabled,
                })}
                onClick={this.scroll}
                ref={(el) => { this.next = el; }}
              >next</button>
            </div>
          }
          <div className={cx('catalog__tariffs-container')} ref={(el) => { this.wrap = el; }}>
            <div
              className={cx('grid-container', 'catalog__tariffs')}
              style={{ transform: `translateX(${this.state.translateTariffs}px)` }}
              ref={(el) => { this.container = el; }}
            >
              {result}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string
  })),
  items: PropTypes.instanceOf(Object),
  click: PropTypes.func,
  moreInfoClick: PropTypes.func
};

Grid.defaultProps = {
  groups: [],
  items: {},
  click: null,
  moreInfoClick: null
};

export default Grid;
