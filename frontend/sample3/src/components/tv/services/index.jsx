import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { Switch } from 'components/vendor-ui';

import style from '../styles.css';

const cx = classNames.bind(style);

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.toggleService = this.toggleService.bind(this);
    this.closePopup = this.closePopup.bind(this);

    this.state = { showPopup: false };
  }

  closePopup() {
    this.setState({ showPopup: false });
    if (this.props.resetAwaiters) {
      this.props.resetAwaiters();
    }
  }

  toggleService(e, service) {
    if (e && e.target && e.target.checked) {
      this.setState({ service, showPopup: true });
    } else {
      this.setState({ service: null });
    }
  }

  render() {
    const {
      title,
      items,
      isVisible
    } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <div className={cx('lk-tv__tile')}>
        <div className={cx('lk-tv__row', 'lk-tv__row--tile-title-row')}>
          <div className={cx('lk-tv__cell')}>
            <h3 className={cx('lk-tv__tile-title')}>{title}</h3>
          </div>
        </div>
        {(items || []).map(x => (
          <div key={x.id} className={cx('lk-tv__row')}>
            <div className={cx('lk-tv__cell', 'lk-tv__cell--left-common')}>
              <Switch checked={x.connected} disabled={x.disabled} id={x.id} name={x.id} />
            </div>
            <div className={cx('lk-tv__cell', 'lk-tv__cell--second')}>
              <div className={cx('lk-tv__sub-row')}>
                <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--first')}>
                  <div className={cx('lk-tv__option-name')}>
                    {/* не готов попап. выводим пока как текст */}
                    {/* <DinamicLink
                      text={x.title}
                    /> */}
                    {x.title}
                  </div>
                </div>
                <div className={cx('lk-tv__sub-cell', 'lk-tv__sub-cell--second')}>
                  <div className={cx('lk-tv__option-description')}>
                    {x.note}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('lk-tv__cell')}>
              <div className={cx('lk-tv__tile-cost')}>{x.fee}</div>
            </div>
          </div>)
          )}
      </div>
    );
  }
}

Services.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    note: PropTypes.string,
    fee: PropTypes.string,
    connected: PropTypes.bool
  })),
  isVisible: PropTypes.bool
};

Services.defaultProps = {
  title: '',
  items: [],
  isVisible: true
};

export default Services;
